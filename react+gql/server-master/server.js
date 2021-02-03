import Express from 'express';
import TypeDefs from './data/schema/schema.js';
import Resolvers from './data/resolvers/resolvers.js';
import as_pkg from 'apollo-server';
// import pkg from 'express-graphql';
// import conn from './mysqlConn.js'; 
// import root from './data/roots.js';
// import gt_pkg from 'graphql-tools';

const { ApolloServer } = as_pkg;
const app = Express();
// const { graphqlHTTP } = pkg;
// const { makeExecutableSchema } = gt_pkg;

const port = 5000;

// const portA = 5000;
// const Schema = makeExecutableSchema({
// 	typeDefs: TypeDefs,
// 	resolvers: Resolvers,
// });

const server = new ApolloServer({
	typeDefs: TypeDefs,
	resolvers: Resolvers 
});



server.listen({port: port}).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}/graphql`);
});

app.get('/', async(req, res) =>{
	res.send('I`m alive');
});

// app.use('/graphql', graphqlHTTP({
// 	schema: Schema,
// 	graphiql: true,
// 	pretty: true,
// 	// rootValue: root,
// 	// resolvers: Resolvers,
// 	// fieldResolver: Resolvers
// }));

// app.listen(port, () => {
// 	console.log(`Example app listening at http://localhost:${port}`);
// 	console.log(`Example graphql listening at http://localhost:${port}/graphql`);
// });