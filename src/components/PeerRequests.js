import Navbar from './Navbar';
import { 
	Flex,	
	useColorModeValue,
	VStack,

} from '@chakra-ui/react';
import { useState } from 'react';
import { gql, useQuery}
	from '@apollo/client';
import PeerCard from'./PeerCard';

const FETCH_PENDING_REQUESTS = gql `

query FetchPendingFriendRequests{
  fetchPendingFriendRequests{
  id,
    email
  }

}
`;
function PeerRequests(){
	const [requests, setRequests]= useState([]);

	useQuery(FETCH_PENDING_REQUESTS, {
		
		onCompleted: (data) => {
			if(data.fetchPendingFriendRequests)
			{
				setRequests(data.fetchPendingFriendRequests);
			}


		},
	
	});
	return (<>
		<Navbar />
		<Flex minH={'100vh'} align="top" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} pt={5}>
			<VStack>

				<div data-cy="friendRequests">
					{requests.length>0?requests.map(request=>
						<PeerCard key={request.id} peer={request} isFriendRequest = {true}/>):''}
				</div>
			</VStack>


		</Flex>
	</>);
}
export default PeerRequests;