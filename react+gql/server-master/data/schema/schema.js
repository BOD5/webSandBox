import pkg from 'apollo-server';

const {gql} = pkg;

const gqlSchema = gql`
	type Date {
		date: String
		time: String
	}

	type Post {
		id: Int
		title: String
		text: String
		createdAt: Date
		author: Author
	}

	type Author {
		id: Int
		firstName: String
		lastName: String
		fullName: String
		posts: [Post]
	}

  type Query {
		author(firstName: String, lastName: String): Author
		posts: [Post]
		authors: [Author]
		hello: String
	}

	input AuthorInput {
		firstName: String
		lastName: String
	}
	
	input PostInput {
		title: String
		text: String
	}
	
	type Mutation {
		createAuthor(input: AuthorInput!):Author!
		updateAuthor(id: ID!, input: AuthorInput!):Author!
		createPost(input: PostInput!):Post!
		updatePost(id: ID!, input: PostInput!):Post!
	}

`;

export default gqlSchema;