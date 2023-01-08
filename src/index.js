/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './index.css';

import ProtectedRoutes from './ProtectedRoutes';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Library from './pages/Library';
import BookRequests from './pages/BookRequests';
import Peers from './pages/Peers';
import Notifications from './pages/Notifications';
import Logout from './pages/Logout';
import BookTitle from './pages/BookTitle';
import PeerRequests from './pages/PeerRequests';

  
const httpLink = createHttpLink({	uri: 'http://localhost:4000/graphql'
});
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	};
});
  
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});
  
export default function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="register" element={<Register />}/>
				<Route path="login" element={<Login/>}/>
				<Route element={<ProtectedRoutes />}>
					<Route path="dashboard" element={<Dashboard/>}/>
					<Route path="search" element={<Search />}/>
					<Route path="search/titles/:id" element={<BookTitle />}/>
					<Route path="library/titles/:id" element={<BookTitle library={true}/>}/>
					<Route path="library/:id" element={<Library/>}/>
					<Route path="library" element={<Library/>}/>
					<Route path="requests" element={<BookRequests/>}/>
					<Route path="peers" element={<Peers/>}/>
					<Route path="peer-requests" element={<PeerRequests/>}/>
					<Route path="notifications" element={<Notifications/>}/>
					<Route path="logout" element={<Logout/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>		
		<ChakraProvider>
			<ApolloProvider client={client}>			
				<App />
			</ApolloProvider>
		</ChakraProvider>
	</React.StrictMode>
);

