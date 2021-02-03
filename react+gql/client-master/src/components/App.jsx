import React from 'react';
import DataList from './DataList.jsx';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	gql,
} from '@apollo/client'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const client = new ApolloClient({
	uri: `http://localhost:5000`, //https://48p1r2roz4.sse.codesandbox.io
	cache: new InMemoryCache()
});


const App = () => {
	return (
		<div>
			{/* <DatePicker /> */}
			<ApolloProvider client={client}>
				{/* React is Work */}
				<DataList/>
			</ApolloProvider>
		</div>
	);
};

export default App;