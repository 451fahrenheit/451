/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './index.css';

import Register from './pages/Register';

export default function App(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="register" element={<Register />}/>
			</Routes>
		</BrowserRouter>
	);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ChakraProvider>			
			<App />
		</ChakraProvider>
	</React.StrictMode>
);

