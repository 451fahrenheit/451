import { 
	Flex,	
	Input, 
	useColorModeValue,
	Button,
	HStack,
	Box,
	VStack,
	Stack,
	RadioGroup,
	Radio

} from '@chakra-ui/react';
import { useState } from 'react';
import Navbar from './Navbar';
import { gql, useLazyQuery, useQuery}
	from '@apollo/client';

import BookCard from './BookCard';
import { useParams } from 'react-router-dom';


const GET_BOOK_BY_TITLE = gql `
query GetUserBookWithTitle($search_title: String!) {
	getUserBookWithTitle(title:$search_title){
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
const FETCH_USER_BOOKS = gql `
query GetBooks {
	getBooks{
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
const FETCH_ANY_USER_BOOKS = gql `
query FetchAnyUserBooks($id: ID!) {
	fetchAnyUserBooks(id:$id){
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

function Library(){

	const [searchText,setSearchText] = useState('');
	const [errorMessage,setError] = useState('');
	const [books,setBooks] = useState([]);
	const [is_public,setPublic] = useState(false);
	const params = useParams();

	const id = parseInt(params.id);
	if(id){

		useQuery(FETCH_ANY_USER_BOOKS, {
			variables: { id: id },
			onCompleted: (data) => {
				if(data.fetchAnyUserBooks)
				{
					setBooks(data.fetchAnyUserBooks);
				}
				else{
					setError('Something went wrong, please try again');
				}

			},
			onError: (error) => {
				setError(error.message);
			}
		});
	}
	else{
		useQuery(FETCH_USER_BOOKS, {
		
			onCompleted: (data) => {
				if(data.getBooks)
				{
					setBooks(data.getBooks);
				}
				else{
					setError('Something went wrong, please try again');
				}

			},
			onError: (error) => {
				setError(error.message);
			}
		});
	}
	const [search] = useLazyQuery(GET_BOOK_BY_TITLE, {
		variables: {
			search_title: searchText,
		},
		onCompleted: (data) => {
			if(data.getUserBookWithTitle)
			{
				setBooks(data.getUserBookWithTitle);
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
	function handlePublicFilter(){
		setPublic(!is_public);
		const filtered_books = books.filter(is_public==is_public);
		setBooks(filtered_books);
		// setPublicValue(e.target.value);
	}
	if(id){
		return (<>
			<Navbar />
			<Flex minH={'100vh'} align="top" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} pt={5}>
				<VStack>
	
					<div data-cy="anyUserBooks">
						{books.length>0?books.map(book=>
							<BookCard key={book.volumeId} book={book} library={true} anyUserId={id}/>):''}
					</div>
				</VStack>
	
	
			</Flex>
		</>);
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
						<Input onChange={handleSearchText} maxW={1500} placeholder='What do you want to read?' data-cy="search"/>
						<Button key="search" onClick={handleSearch} data-cy="searchButton">Search</Button>						
						<RadioGroup onChange={handlePublicFilter} >
							<Stack direction='row'>
								{is_public?
									<Radio value='1'>All</Radio>:<Radio value='2'>Public</Radio>
								}
							</Stack>
						</RadioGroup>
					</HStack>
					
				</Box>
				<p data-cy="errorMessage">{errorMessage}</p>
				<div data-cy="searchResults">
					{books.length>0?books.map(book=>
						<BookCard key={book.volumeId} book={book} library={true}/>):''}
				</div>
			</VStack>


		</Flex>
	</>);
}
export default Library;