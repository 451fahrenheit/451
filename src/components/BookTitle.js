import Navbar from './Navbar';
import { 
	Flex,	
	HStack,	
	useColorModeValue,
	Button,
	Box,
	Image,
	VStack,
	Text
} from '@chakra-ui/react';
import { gql, useQuery, useMutation} from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const SEARCH_BY_ID_QUERY = gql `
query Title($volume_id: String!) {
	title(volumeId:$volume_id){
		volumeId
		title
		subtitle
		description
		authors
		language
		pubDate
		smallthumbnail
		thumbnail
	}
	}
`;
const GET_BOOK_WITH_ID = gql `

      query GetUserBookWithId($id: ID!) {
        getUserBookWithId(id:$id){
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
        }
        }
      
`;
const UPDATE_BOOK = gql `
mutation UpdateBook($isPublic: Boolean!, $id: ID!) {
	updateBook(input: {isPublic: $isPublic, id: $id}) {
		book {
			id
			volumeId
			title
			userId
			isPublic
		}
	}
}`;
function BookTitle({library}){
	const params = useParams();
	const id = parseInt(params.id);
	const [is_public,setPublic] = useState(false);
	const [updateBook] = useMutation(UPDATE_BOOK);
	function handleIspublic(e, book){
		if (e.target === e.currentTarget) {

			setPublic(!book.isPublic);
			updateBook(	({	variables: {
				isPublic: is_public, 
				id: parseInt(book.id),
			}}));
		}
	}
	if(library){
		const { loading, error, data } = useQuery(GET_BOOK_WITH_ID, {
			variables: { id: id },
		});
		if (loading) return <p>Loading ...</p>;
		if (error) return `Error! ${error.message}`;
		return(<>
			<Navbar/>
			<Flex minH={'100vh'} align="top" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} pl= {10} pr={10} pt={5}>
				<HStack>
					<Image minHeight={300} minWidth={300} maxHeight={300} maxWidth={400} m={5} src={data.getUserBookWithId.thumbnail} alt={data.getUserBookWithId.title}></Image>
					<VStack align="left" mt={15}>
						<Text as='b' data-cy="titleSelector">{data.getUserBookWithId.title}</Text>
						<Text>-- {data.getUserBookWithId.subtitle}</Text>
						<Text>By {data.getUserBookWithId.authors.join(',')}</Text>
						<Text>Available in {data.getUserBookWithId.language}</Text>
						<Text>Published on {data.getUserBookWithId.pubDate}</Text>
						<Text><Text as='b'>Synopsis </Text> {data.getUserBookWithId.description.replace(/(<([^>]+)>)/ig, '')}</Text>

							(<HStack>					
							{!data.getUserBookWithId.isPublic?
								(<Box>
									<Button data-cy="makePublic" key={data.getUserBookWithId.volumeId} onClick={(e)=>handleIspublic(e,data.getUserBookWithId)}>Make it Public</Button>
								</Box>)	:(<Box>
									<Button data-cy="makePersonal" key={data.getUserBookWithId.volumeId} onClick={(e)=>handleIspublic(e,data.getUserBookWithId)}>Make it Personal</Button>
								</Box>)
							}	
						</HStack>)
						
					</VStack>
					
				</HStack>
	
			</Flex>
		</>);
	}
	else{
		const { loading, error, data } = useQuery(SEARCH_BY_ID_QUERY, {
			variables: { volume_id: params.id },
		});
		if (loading) return <p>Loading ...</p>;
		if (error) return `Error! ${error.message}`;
		return(<>
			<Navbar/>
			<Flex minH={'100vh'} align="top" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} pl= {10} pr={10} pt={5}>
				<HStack>
					<Image minHeight={300} minWidth={300} maxHeight={300} maxWidth={400} m={5} src={data.title.thumbnail} alt={data.title.title}></Image>
					<VStack align="left" mt={15}>
						<Text as='b' data-cy="titleSelector">{data.title.title}</Text>
						<Text>-- {data.title.subtitle}</Text>
						<Text>By {data.title.authors.join(',')}</Text>
						<Text>Available in {data.title.language}</Text>
						<Text>Published on {data.title.pubDate}</Text>
						<Text><Text as='b'>Synopsis </Text> {data.title.description.replace(/(<([^>]+)>)/ig, '')}</Text>
						<HStack>
							<Box>
								<Button>Add to library</Button>
							</Box>
							<Box>
								<Button>Buy</Button>
							</Box>
						</HStack>
					</VStack>
					
				</HStack>
	
			</Flex>
		</>);
	}


}

export default BookTitle;