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
import { Link ,  Link as RouterLink, 
	useNavigate 
} from 'react-router-dom';
import { useState } from 'react';

const ADD_TO_LIBRARY_MUTATION = gql`
mutation AddBook($volumeId: String!, $title: String!, $subtitle: String!, $description: String!, $authors: [String!], $smallthumbnail: String!, $thumbnail: String!, $language: String!, $pubDate: String!) {
	addBook(input: {addBook: {volumeId: $volumeId, title: $title, subtitle: $subtitle, description: $description, authors: $authors, smallthumbnail: $smallthumbnail, thumbnail: $thumbnail, language: $language, pubDate: $pubDate}}) {
		book {
			id
			volumeId
			title
			userId
		}
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

const REQUEST_BOOK = gql `
mutation RequestBook($sentToId: ID!,$sentForId: ID!){
	requestBook(input:{sentToId:$sentToId, sentForId:$sentForId}){
		success
	}
}`;

function BookCard({book, library, anyUserId}) {
	const [is_public,setPublic] = useState(false);
	const navigate = useNavigate();
	let anyUser = false;
	if(anyUserId){
		anyUser = true;
	}
	const [addBook] = useMutation(ADD_TO_LIBRARY_MUTATION, {
		variables: {
			volumeId: book.volumeId, 
			title: book.title,
			subtitle: book.subtitle,
			description: book.description,
			authors: book.authors,
			language: book.language,
			pubDate: book.pubDate,
			smallthumbnail: book.smallthumbnail,
			thumbnail: book.thumbnail
		},
		onCompleted: (data) => {
			if(data.createUser.user.id)
			{

				navigate('/library');
			}
		},

	});
	const [updateBook] = useMutation(UPDATE_BOOK, {
		onCompleted: (data) => {
			if(data.createUser.user.id)
			{
				navigate('/library');
			}
		},

	});
	const [requestBook] = useMutation(REQUEST_BOOK);

	function handleAddToLibrary(e){
		if (e.target === e.currentTarget) {
			addBook();
		}	
	}
	function handleIspublic(e, book){
		if (e.target === e.currentTarget) {

			setPublic(!book.isPublic);
			updateBook(	({	variables: {
				isPublic: is_public, 
				id: parseInt(book.id),
			}}));
		}
	}

	function handleRequestBook(e, book){
		if (e.target === e.currentTarget) {
			setPublic(!book.isPublic);
			requestBook(	({	variables: {
				sentToId: parseInt(anyUserId), 
				sentForId: parseInt(book.id),
			}}));
		}
	}
	return <div key={book.volumeId}>	<Box
		rounded={'lg'}
		bg={useColorModeValue('white', 'gray.700')}
		boxShadow={'lg'}
		minHeight={100}
		minWidth={480}
		mb={1}>
		<HStack>
			<Box>
				<Image minHeight={90} minWidth={90} maxHeight={90} maxWidth={90} m={2} src={book.smallthumbnail} alt={book.title}></Image>
			</Box>
			<VStack align="left" paddingRight={10}>
				{library?(<Link maxWidth={80}  as={RouterLink} to={'titles/' + book.id} data-cy="title">
					{book.title}
				</Link>):(<Link maxWidth={80}  as={RouterLink} to={'titles/' + book.volumeId} data-cy="title">
					{book.title}
				</Link>
				)}
				<Text>
					by {book.authors.join(',')}
				</Text>
				<HStack>
					<Text>{book.language}</Text>
					<Text>{book.pubDate}</Text>
				</HStack>
				{library?
					(<HStack>					
						{!book.isPublic&&!anyUser&&
							(<Box>
								<Button data-cy="makePublic" key={book.volumeId} onClick={(e)=>handleIspublic(e,book)}>Make it Public</Button>
							</Box>)	}
						{book.isPublic&&!anyUser&&(<Box>
							<Button data-cy="makePersonal" key={book.volumeId} onClick={(e)=>handleIspublic(e,book)}>Make it Personal</Button>
						</Box>)
						}	
						{anyUser&&(<Box>
							<Button data-cy="requestBook" key={book.volumeId} onClick={(e)=>handleRequestBook(e,book)}>Request Book</Button>
						</Box>)

						}
					</HStack>):
					(<HStack>		
								
						<Box>
							<Button data-cy="addTitle" key={book.volumeId} onClick={handleAddToLibrary}>Add to library</Button>
						</Box>
						<Box>
							<Button>Buy</Button>
						</Box>
					</HStack>)
				}
			</VStack>
		</HStack>

	</Box></div>;
}
export default BookCard;
