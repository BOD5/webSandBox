import { Author, Post } from '../connection/sequelizeConn.js';

const getQuerySelection = ({ fieldNodes }) => {
	return fieldNodes.map(node => {
		console.log('node.selectionSet.selections --', node.selectionSet.selections);
		return node.selectionSet.selections;
	})
		.flat()
		.map(s => s.name.value);
	// .join(' ');
};

const getQuerySubArguments = ({ fieldNodes }) => {
	return fieldNodes
		.map(node => node.selectionSet.selections)
		.flat()
		.filter(s => s.arguments && s.arguments.length)
		.map(s => s.arguments)
		.flat()
		.filter(a => a.kind === 'Argument');
};

const getLimits = rawArgs => {
	const limitArg = rawArgs.find(a => a.name.value === 'LIMIT');
	return limitArg && limitArg.value ? parseInt(limitArg.value.value) : null;
};

const getSelectionDepth = (node, currentDepth = 1) => {
	return node.map(n => {
		if (!n.selectionSet) {
			return currentDepth;
		}
		return Math.max(
			...getSelectionDepth(
				n.selectionSet.selections,
				currentDepth + 1
			)
		);
	});
};
		
async function getPosts(find, selection) {
	selection = selection.filter(item => item !== 'author');
	return Post.findAll({
		where: find,
		attributes: selection,	
	});
}
		
async function getAuthor(find, selection) {
	selection = selection.filter(item => item !== 'posts');
	return Author.findOne({
		where: find,
		attributes: selection,	
	});
}
		
const Query =  {
	author: async (parent, args, context, info) => {
		// console.log('parent -- ', parent);
		// console.log('args -- ', args);
		// console.log('context -- ', context);
		// console.log('info -- ', info);
		// return Author.findOne({ where: args });
		try {
			const selection = getQuerySelection(info);
			console.log('selection -- ', selection);
			return await getAuthor(args, selection);
		} catch (err) {
			throw new Error(err);
		}
	},
	authors: async (parent, args, context, info) => {
		try {
			const selection = getQuerySelection(info);
			console.log('selection -- ', selection);
			return await Author.findAll({
				where: args,
				attributes: selection,	
			});
		} catch (err) {
			throw new Error(err);
		}
	},
	posts: async (parent, args, context, info) => {
		try {
			const selection = getQuerySelection(info);
			console.log('selection -- ', selection);
			return await Post.findAll({
				where: args,
				attributes: selection,	
			});
		} catch (err) {
			throw new Error(err);
		}
	},
};

const Mutation = {
	createAuthor: (parent, { input }) => {
		return Author.create(input);
	},
	createPost: (parent, { input }) => {
		return Post.create(input);
	},
	updateAuthor: (parent, { id, input }) => {
		return Author.update(input, {where: {id: id}});
	},
	updatePost: (id, { input }) => {
		return Post.create(input, {where: id});
	}
};

// const { fieldNodes } = info;
// 		const getSelectionDepth = getSelectionDepth(fieldNodes)[0];

// 		if (getSelectionDepth > 5) {
// 			throw new Error('Max selection depth exceeded');
// 		}
// 		else 


const author = {
	posts: async (parent, args, context, info) => {
		return getPosts(parent.id);
	},
};

const post = {
	author: async (parent, args, context, info) => {
		return getAuthor(parent.authorId);
	},
};

const date = {
	date: (arg) => {
		const date = new Date(arg);
		const strD = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
		return strD;
	},
	time: (arg) => {
		const date = new Date(arg);
		const strD = `${date.getHours()}:${date.getMinutes()}`;
		return strD;
	}
};

export default {
	Query: Query,
	Mutation: Mutation,
	Author: author,
	Post: post,
	Date: date
};
