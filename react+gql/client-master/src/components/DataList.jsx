import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { List } from 'antd';
import { graphql } from 'graphql';

const QUERY = gql`
	query GetPosts {
		authors{
			id
			firstName
			lastName
			posts {
				id
				title
				text
				createdAt{
					date
					time
				}
				author {
					lastName
				}
			}
		}
	}
`;

// const listWhithData = graphql(channelsListQuery)(DataList);

const DataList = () => {
	// console.log(useQuery(QUERY));
	const { loading, error, data } = useQuery(QUERY);
	if (loading) return <p>Loading...</p>;
	if (error){
		console.log('error: ', error);
		return <p>Error :(</p>;
	}
	// console.log('data ', data);
	// console.log('authors ', data.authors);
	// data.authors.map((author) => {
	// 	console.log('author id ',author.id);
	// 	console.log('author ',author.firstName);
	// 	console.log('author.lastName ', author.lastName);
	// });
	return (
		<List
			itemLayout='vertical'
			size='large'
			pagination={{
				onChange: page => {
					console.log(page);
				},
				pageSize: 3,
			}}
			dataSource={data.authors}
			renderItem={author => (
				<List.Item
					key={author.id}
				>
					<List.Item.Meta
						title={author.firstName + ' ' + author.lastName}
						description={`posts by ${author.firstName} ${author.lastName}`}
					/>
					<List
						itemLayout='vertical'
						size='large'
						pagination={{
							onChange: page => {
								console.log(page);
							},
							pageSize: 3,
						}}
						dataSource={author.posts}
						renderItem={post => (
							<List.Item
								key={post.id}
							>
								<List.Item.Meta
									title={post.title}
								/>
								{post.text}
							</List.Item>
						)}/>					
				</List.Item>
			)}
		/>
	);
}

export default DataList;