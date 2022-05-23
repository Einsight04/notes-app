import React from 'react';
import Notes from './pages/Notes'
import Create from './pages/Create'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Layout from "./components/Layout";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'Akshar',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Notes/>}/>
                        <Route path="/create" element={<Create/>}/>
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;