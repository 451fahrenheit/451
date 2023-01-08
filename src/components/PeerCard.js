import { 
	useColorModeValue,
	Button,
	HStack,
	Box,
	VStack,
	Text
} from '@chakra-ui/react';
import { 
	useMutation, gql
}
	from '@apollo/client';
import { Link ,  Link as RouterLink,  
} from 'react-router-dom';


const ADD_PEER = gql`
mutation AddFriend($sentToId: ID!){
	addFriend(input:{sentToId:$sentToId}){
		success
	}
}
	`;
const UPDATE_BOOK = gql `
mutation UpdateFriend($sentById: ID!){
	updateFriend(input:{sentById:$sentById, approve: true}){
		success
	}
}`;

function PeerCard({peer, isNewPeers, isFriendRequest}) {

	const [addFriend] = useMutation(ADD_PEER, {
		variables: {
			sentToId: peer.id, 
		},

	});
	const [updateFriend] = useMutation(UPDATE_BOOK, {
		variables: {
			sentById: peer.id, 
		},
	});
	function handleNewFriend(e){

		if (e.target === e.currentTarget) {
			addFriend();

		}	
	}
	function handleUpdateFriend(e){

		if (e.target === e.currentTarget) {
			updateFriend();

		}	
	}


	
	return <div key={peer.id}>	<Box
		rounded={'lg'}
		bg={useColorModeValue('white', 'gray.700')}
		boxShadow={'lg'}
		minHeight={100}
		minWidth={480}
		mb={1}>
		<HStack>
			<VStack align="left" paddingRight={10}>
				<Text>{peer.email}</Text>
				<>
				
					{isNewPeers &&
						(<HStack>					
							(<Box>
								<Button data-cy="AddFriend" key={peer.id} onClick={(e)=>handleNewFriend(e,peer)}>AddFriend</Button>
							</Box>)
						
						</HStack>)
					}
					{isFriendRequest &&
						(<HStack>		
								
							<Box>
								<Button data-cy="ApproveFriend" key={peer.id} onClick={(e)=>handleUpdateFriend(e,peer)}>Approve</Button>
							</Box>
						</HStack>)
					}
					{!isNewPeers && !isFriendRequest &&
					(<HStack>		
								
						<Box>
							<Button data-cy="viewLibrary" key={peer.id}>
								<Link maxWidth={80}  as={RouterLink} to={'/library/' + peer.id} data-cy="title">
								View Library
								</Link>
							</Button>
						</Box>
					</HStack>)
					}
				</>
			</VStack>
		</HStack>

	</Box></div>;
}
export default PeerCard;
