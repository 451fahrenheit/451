import Navbar from './Navbar';
import { 
	Flex,	
	Input, 
	useColorModeValue,
	Button,
	HStack,
	Box,
	VStack,

} from '@chakra-ui/react';
import { useState } from 'react';
import { gql, useLazyQuery, useQuery}
	from '@apollo/client';
import PeerCard from'./PeerCard';

const FETCH_PEERS = gql `
      query FetchFriends{
        fetchFriends{
        id,
          email
        }
      
      }
`;

const SEARCH_PEERS = gql `
	query SearchFriend($searchEmail: String!){
		searchFriend(searchEmail: $searchEmail){
		id,
			email
		}
	}
`;
const SEARCH_NEW_PEERS = gql `
	query SearchUsersWithEmail($searchEmail: String!) {
		searchUsersWithEmail(searchEmail: $searchEmail){
		id,
		email
		}
	
	}
`;

function Peers(){
	const [searchText, setSearchText]= useState('');
	const [errorMessage, setError]= useState('');
	const [peers, setPeers]= useState([]);
	const [isNewPeers, setNewPeers]= useState(false);

	useQuery(FETCH_PEERS, {
		
		onCompleted: (data) => {
			if(data.fetchFriends)
			{
				setPeers(data.fetchFriends);
				setError('');
			}
			else{
				setError('Something went wrong, please try again');
			}

		},
		onError: (error) => {
			setError(error.message);
		}
	});
	const [search] = useLazyQuery(SEARCH_PEERS, {
		variables: {
			searchEmail: searchText,
		},
		onCompleted: (data) => {
			if(data.searchFriend)
			{
				setPeers(data.searchFriend);
				setError('');

			}
			else{
				setError('Something went wrong, please try again');
			}

		},
		onError: (error) => {
			setPeers([]);
			setError(error.message);
		}
	});
	const [findNewPeers] = useLazyQuery(SEARCH_NEW_PEERS, {
		variables: {
			searchEmail: searchText,
		},
		onCompleted: (data) => {
			if(data.searchUsersWithEmail)
			{
				setPeers(data.searchUsersWithEmail);
				setError('');

			}
			else{
				setError('Something went wrong, please try again');
			}

		},
		onError: (error) => {
			setPeers([]);
			setError(error.message);
		}
	});
	
	function handleSearchText(e){
		setSearchText(e.target.value);
	}
	function handleSearch(){
		setNewPeers(false);
		search();
	}
	function handleNewPeersSearch(){
		setNewPeers(true);
		findNewPeers();
	}
	return (<>
		<Navbar />
		<Flex minH={'100vh'} align="top" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} pt={5}>
			<VStack>

				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={5}
					maxH={20}>
					<HStack>
						<Input onChange={handleSearchText} maxW={1500} placeholder='Find a peer or new peer?' data-cy="search"/>
						<Button key="searchInFriends" minW={150} onClick={handleSearch} data-cy="searchInFriendsButton">Find in Peers</Button>
						<Button key="searchForNewPeers" minW={150} onClick={handleNewPeersSearch} data-cy="searchForNewPeersButton">Find a new Peer</Button>
					</HStack>
					
				</Box>
				<p data-cy="errorMessage">{errorMessage}</p>
				<div data-cy="searchResults">
					{peers.length>0?peers.map(peer=>
						<PeerCard key={peer.id} peer={peer} isNewPeers = {isNewPeers}/>):''}
				</div>
			</VStack>


		</Flex>
	</>);
}
export default Peers;