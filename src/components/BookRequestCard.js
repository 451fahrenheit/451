import { 
	useColorModeValue,
	Button,
	HStack,
	Box,
	VStack,
	Image,
	Text
} from '@chakra-ui/react';
import { 
	useMutation, gql
}
	from '@apollo/client';

const APPROVE_REQUEST = gql `mutation ApproveBookRequest($sentById: ID!,$sentForId: ID!){
  approveBookRequest(input:{ sentById:$sentById, sentForId:$sentForId, approve: true}){
    success
  }
}`;
function BookRequestCard({bookRequest}){
	const [approveRequest] = useMutation(APPROVE_REQUEST);
  
	function handleBookRequest(e, request){
		if (e.target === e.currentTarget) {

			approveRequest(	({	variables: {
				sentById: request.requestedBy.id, 
				sentForId: parseInt(request.id),
			}}));
		}
	}
	return <div key={bookRequest.id}>
		<Box
			rounded={'lg'}
			bg={useColorModeValue('white', 'gray.700')}
			boxShadow={'lg'}
			minHeight={100}
			minWidth={480}
			mb={1}>
			<HStack>
				<Box>
					<Image minHeight={90} minWidth={90} maxHeight={90} maxWidth={90} m={2} src={bookRequest.smallthumbnail} alt={bookRequest.title}></Image>
				</Box>
				<VStack align="left" paddingRight={10}>

					<Text>
					by {bookRequest.authors.join(',')}
					</Text>
					<HStack>
						<Text>{bookRequest.language}</Text>
						<Text>{bookRequest.pubDate}</Text>
						<Text>{bookRequest.requestedBy.email}</Text>
						<Box>
							<Button data-cy="approveBookRequest" key={bookRequest.id} onClick={(e)=>handleBookRequest(e,bookRequest)}>Approve Request</Button>
						</Box>
					</HStack>

				</VStack>
			</HStack>

		</Box>
	</div>;
}

export default BookRequestCard;