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

const ADD_TO_LIBRARY_MUTATION = gql`
mutation AddBook {
	addBook(input: {addBook: {volumeId: "goodbook", title: "alpha", subtitle: "alpha", description: "alpha", authors: ["alpha", "beta"], smallthumbnail: "alpha", thumbnail: "alpha", language: "alpha", pubDate: "alpha"}}) {
		book {
			id
			volumeId
			title
			userId
		}
	}
}
	`;
function BookCard({book}) {
	const navigate = useNavigate();
	const [addBook] = useMutation(ADD_TO_LIBRARY_MUTATION, {
		variables: {
			volumeId: book.volumeID, 
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
	function handleAddToLibrary(e){
		// const navigate = useNavigate();

		if (e.target === e.currentTarget) {
			addBook();

			console.log(book, e.target, e.currentTarget ,'book');
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
				<Link maxWidth={80}  as={RouterLink} to={'titles/' + book.volumeId} data-cy="title">
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
						<Button data-cy="addTitle" key={book.volumeId} onClick={handleAddToLibrary}>Add to library</Button>
					</Box>
					<Box>
						<Button>Buy</Button>
					</Box>
				</HStack>
			</VStack>
		</HStack>

	</Box></div>;
}
export default BookCard;
