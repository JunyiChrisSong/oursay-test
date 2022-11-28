import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core'

const SSO = () => {
    let navigate = useNavigate();
    return (
        <div>
            <h1>This is the SSO page</h1>
            <Button variant="outlined" onClick={() => {navigate('/qr-scanner')}}> Authenticate </Button>
        </div>
    );
}

export default SSO;