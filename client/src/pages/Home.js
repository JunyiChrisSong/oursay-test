import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core'
import './styles.css';

function Home() {
    let navigate = useNavigate();
    return (
        <div>
            <h1>This is the home page</h1>
            <Button variant="outlined" onClick={() => {navigate('/SSO')}}> Student </Button>
            <Button variant="outlined" onClick={() => {navigate('/admin')}}> Administrator </Button>
        </div>
    );
}

export default Home;

// SSO = team selection & authentication, 