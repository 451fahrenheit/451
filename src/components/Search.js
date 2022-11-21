import { 
	Flex,	
	Input, 
	useColorModeValue,
	Button,
	HStack,
	Box,
	VStack,
	Image,
	Text
} from '@chakra-ui/react';
import { useState } from 'react';
import Navbar from './Navbar';
import { gql, useLazyQuery} from '@apollo/client';
import { Link ,  Link as RouterLink  } from 'react-router-dom';

const SEARCH_QUERY = gql `
query Titles($search_title: String!) {
	titles(searchTitle:$search_title){
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

function Search(){
	const [searchText,setSearchText] = useState('');
	const [errorMessage,setError] = useState('');
	const [books,setBooks] = useState([]);

	const [search] = useLazyQuery(SEARCH_QUERY, {
		variables: {
			search_title: searchText,
		},
		onCompleted: (data) => {
			if(data.titles)
			{
				setBooks(data.titles);
			}
			else{
				setError('Something went wrong, please try again');
			}

		},
		onError: (error) => {
			setError(error.message);
		}
	});

	function handleSearch(){
		search();
	}
	function handleSearchText(e){
		setSearchText(e.target.value);
	}

	return (<>
		<Navbar/>
		<Flex minH={'100vh'} align="top" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} pt={5}>
			<VStack>

				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={5}
					maxH={20}>
					<HStack>
						<Input onChange={handleSearchText} maxW={1500} placeholder='What do you want to read?' />
						<Button onClick={handleSearch}>Search</Button>
					</HStack>
					
				</Box>
				<p>{errorMessage}</p>
				<div>
					{books.length>0?books.map(book=>
						bookCard(book)):''}
				</div>
			</VStack>


		</Flex>
	</>);
}
export default Search;

function bookCard(book) {
	return <div key={book.volumeId}>	<Box
		rounded={'lg'}
		bg={useColorModeValue('white', 'gray.700')}
		boxShadow={'lg'}
		minHeight={100}
		minWidth={480}
		mb={1}>
		<HStack>
			<Box>
				<Image minHeight={90} minWidth={90} maxHeight={90} maxWidth={90} m={2} src={book.smallthumbnail} alt='Dan Abramov'></Image>
			</Box>
			<VStack align="left" paddingRight={10}>
				<Link maxWidth={80}  as={RouterLink} to={'titles/' + book.volumeId}>
					{book.title}
				</Link>
				<Text>
					by {book.authors.join(',')}
				</Text>
				<HStack>
					<Text>{book.language}</Text>
					<Text>{book.pubDate}</Text>
				</HStack>
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

	</Box></div>;
}
