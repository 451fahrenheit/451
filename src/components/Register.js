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
import { Navigate } from 'react-router-dom';

// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
// const navigate = useNavigate();

const SIGNUP_MUTATION = gql`
	mutation SignupMutation(
	  $email: String!
	  $password: String!
	) {
	  signup(
		email: $email
		password: $password
		name: $name
	  ) {
		success
	  }
	}
	`;
function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setError] = useState('');

	const signup = useMutation(SIGNUP_MUTATION, {
		variables: {
			email: email,
			password: password
		},
		onCompleted: (data) => {
			if(data.success)
			{
				<Navigate to="/dashboard" replace={true} />;
			}
			else{
				setError('Something went wrong, please try again');
			}

		},
		onError: (error) => {
			setError(error);
		}
	});


	function handleEmailChange(e){
		setEmail(e.target.value);
	}
	function handlePasswordChange(e){
		setPassword(e.target.value);
	}
	function handleRegister(){

		if(hasValidateEmailPassword()){
			signup;
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
					<Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
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
                Register
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
                Already a user? <Link color={'blue.400'}>Login</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
		

export default Register;