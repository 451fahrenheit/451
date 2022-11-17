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
import {gql, useMutation} from '@apollo/client';
const SEARCH_MUTATION = gql`
mutation CreateUser($email: String!, $password: String!){
	createUser(input: {authProvider: {credentials: {email: $email, password: $password}}}) {
		user {
			id
			email
		
	}
}				
}
	`;
function Search(){
	const [searchText,setSearchText] = useState('');
	const [errorMessage,setError] = useState('');

	const [searchTitle,{loading, data}] = useMutation(SEARCH_MUTATION, {
		variables: {
			searchText: searchText,
		},
		onError: (error) => {
			setError(error.message);
		}		
	});
	function handleSearch(){
		searchTitle();
	}
	function handleSearchText(e){
		setSearchText(e.target.value);
	}
	const bookCard = <Box
		rounded={'lg'}
		bg={useColorModeValue('white', 'gray.700')}
		boxShadow={'lg'}
		minHeight={100}
		minWidth={480}>
		<HStack>
			<Box>
				<Image maxHeight={90} maxWidth={90} m={2} src='https://bit.ly/dan-abramov' alt='Dan Abramov'></Image>
			</Box>
			<VStack align="left" paddingRight={10}>
				<Text >
					Title
				</Text>
				<Text>
					Author
				</Text>
				<HStack>
					<Text>Language</Text>
					<Text>Published on</Text>
				</HStack>
			</VStack>
			<VStack align="right" >
				<Box>
					<Button>Add to library</Button>
				</Box>
				<Box>
					<Button>Buy</Button>
				</Box>
			</VStack>
		</HStack>

	</Box>;
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
				if(!loading){
					{bookCard}
				}	
			</VStack>


		</Flex>
	</>);
}
export default Search;