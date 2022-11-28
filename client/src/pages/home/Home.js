import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, ThemeProvider, makeStyles} from '@material-ui/core';


import './styles.css';


const useStyles = makeStyles({
    btn: {
        backgroundColor: '#FFFFFF',
        color: '#B3A369',
        fontWeight: 'normal',
        margin: '1vh',
        width: '19vw',
        fontSize: '2vw'
    }
});
function Home() {

    let navigate = useNavigate();
    const classes = useStyles();
    return (
        <div class="container">
            <div class="white-background">
                <div class="title">
                    OurSay    
                </div>
                <div className="subtitle-home">
                    “Your Favorite Campus Voting App”
                </div>
            </div>
            
            <div className='bottom'>
                <div class="login-as">
                    <h2>Login as ...</h2>
                
                <ThemeProvider>
                    <Button href="#" className={classes.btn} variant="contained" onClick={() => {navigate('/SSO')}}> Student </Button>
                    <Button href="#" className={classes.btn} variant="contained" onClick={() => {navigate('/admin')}}> Administrator </Button>
                </ThemeProvider>
                </div>
            </div>
            
            

        </div>
    );
}

export default Home;

// SSO = team selection & authentication, 
