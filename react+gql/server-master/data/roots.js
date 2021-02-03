import { Author, Post } from '../sequelizeConn.js';

const root = {
	hello: () => 'It works!',
	author: (args) => {
		console.log('args -- ', args.firstName);
		return Author.findOne({ where: args });
	},
	authors: () => {
		return Author.findAll();
	},
	posts: () => {
		return Post.findAll();
	},
	// Author: {
	// 	posts: (author) => {
	// 		console.log('pipira');
	// 		return author.getPosts();
	// 	},
	// },
	// Post: {
	// 	author: (post) => {
	// 		return post.getAuthor();
	// 	},
	// },
};

export default root;