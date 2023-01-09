import { 
	Flex,	
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import Navbar from './Navbar';
import { useState } from 'react';
import { gql, useQuery}
	from '@apollo/client';

import BookRequestCard from './BookRequestCard';
const FETCH_BOOK_REQUESTS = gql `
query FetchPendingBookRequests{
	fetchPendingBookRequests{
		id
		volumeId
		title
		subtitle
		description
		authors
		language
		pubDate
		smallthumbnail
		thumbnail
		isPublic
		requestedBy{
			id
			email
		}
	}
}
`;
function BookRequests(){
	const [bookRequests, setBookRequests] = useState([]);
	useQuery(FETCH_BOOK_REQUESTS, {
		onCompleted: (data) => {
			if(data.fetchPendingBookRequests)
			{
				setBookRequests(data.fetchPendingBookRequests);
			}
		},
	});
	console.log(bookRequests,'Hello');
	return (<>
		<Navbar />
		<Flex minH={'100vh'} align="top" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} pt={5}>
			<VStack>
	
				<div data-cy="bookRequests">
					{bookRequests.length>0?bookRequests.map(bookRequest=>
						<BookRequestCard key={bookRequest.volumeId} bookRequest={bookRequest} bookrequest={true} />):''}
				</div>
			</VStack>
	
	
		</Flex>
	</>);
}
export default BookRequests;