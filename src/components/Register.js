import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from '@chakra-ui/react';

import { useState } from 'react';
import {gql, useMutation} from '@apollo/client';
import {  Link as RouterLink , useNavigate } from 'react-router-dom';


// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
// const navigate = useNavigate();

const SIGNUP_MUTATION = gql`
mutation CreateUser($email: String!, $password: String!){
	createUser(input: {authProvider: {credentials: {email: $email, password: $password}}}) {
		user {
			id
			email
		
	}
}				
}
	`;
const SIGNIN_MUTATION = gql`
mutation LoginUser($email: String!, $password: String!) {
	loginUser(input:{credentials:{email:$email, password:$password}}){
		token
		}

}		
	`;
function Register(props) {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setError] = useState('');

	const btnText = props.isLogin?'Login':'Register';
	const linkText = props.isLogin?'Register':'Login';
	const linkHelperText= props.isLogin?'Do not have an account?':'Already a user?';
	const routeText = props.isLogin?'/register':'/login';

	const [signup] = useMutation(SIGNUP_MUTATION, {
		variables: {
			email: email,
			password: password
		},
		onCompleted: (data) => {
			if(data.createUser.user.id)
			{
				navigate('/login');
			}
			else{
				setError('Something went wrong, please try again');
			}

		},
		onError: (error) => {
			setError(error.message);
		}
	});
	const [authenticate] = useMutation(SIGNIN_MUTATION, {
		variables: {
			email: email,
			password: password
		},
		onCompleted: (data) => {
			if(data.loginUser.token)
			{
				navigate('/dashboard');
			}
			else{
				setError('Something went wrong, please try again');
			}

		},
		onError: (error) => {
			setError(error.message);
		}		
	});


	function handleEmailChange(e){
		setError('');
		setPassword('');
		setEmail(e.target.value);
	}
	function handlePasswordChange(e){
		setError('');
		setPassword(e.target.value);
	}

	function  handleRegister(){
		if(hasValidateEmailPassword())
		{
			props.isLogin?authenticate():signup();
		}
	}

	function hasValidateEmailPassword(){
		const passwordRegEx  = /^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/;
		const emailRegEx  =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		
		if(email === '' || password === ''){
			setError('Fields cannot be blank');
		}
		else if(!emailRegEx.test(email)){
			setError('Email should be in the format identity@yourmail.com');
		}
		else if(!passwordRegEx.test(password)){
			setError('Password should have a length of 8, should contain a character, a number, a letter');
		}
		else{
			return true;
		}
		

	}

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'} data-cy="heading">
						{props.isLogin?'Login':'Sign up'}
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						{props.isLogin?'to start sharing':'to enjoy all of our cool features ✌️'}
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<Stack spacing={4}>
						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input 
								data-cy="email"
								type="email" 
								value={email} 
								onChange= {handleEmailChange}/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									data-cy="password"
									type={showPassword ? 'text' : 'password'} 
									value={password}
									onChange= {handlePasswordChange}/>
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}>
										{/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								aria-label="register"
								loadingText="Submitting"
								size="lg"
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								onClick={handleRegister}
							>
								{btnText}
							</Button>
						</Stack>
						<FormControl id="errorMessage" pt={2}>
							<FormLabel
								color={'red'}
								data-cy="errorMessage"
							>
								{errorMessage}
							</FormLabel>
						</FormControl>
						<Stack pt={6}>
							<Text align={'center'}>
								
								{linkHelperText} <Link as={RouterLink} to={routeText} color={'blue.400'}>{linkText}</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
		

export default Register;
