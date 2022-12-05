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
// import { useState } from 'react';
import { gql, useQuery} from '@apollo/client';

// import { Link ,  Link as RouterLink  } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
function BookTitle(){
	const params = useParams();

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

export default BookTitle;