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
import Navbar from './Navbar';
import { gql, useLazyQuery,}
	from '@apollo/client';

import BookCard from './BookCard';

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
						<Input onChange={handleSearchText} maxW={1500} placeholder='What do you want to read?' data-cy="search"/>
						<Button key="search" onClick={handleSearch} data-cy="searchButton">Search</Button>
					</HStack>
					
				</Box>
				<p data-cy="errorMessage">{errorMessage}</p>
				<div data-cy="searchResults">
					{books.length>0?books.map(book=>
						<BookCard key={book.volumeId} book={book}/>):''}
				</div>
			</VStack>


		</Flex>
	</>);
}
export default Search;

