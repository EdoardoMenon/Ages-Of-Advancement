import { Box } from '@chakra-ui/react';
import './App.css';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';

function App() {
    return (
        <Box backgroundColor="primary.500" className="app">
            <Navbar />
            <Main />
        </Box>
    );
}

export default App;
