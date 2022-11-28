import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, makeStyles, TextField, Box } from '@material-ui/core'

import './styles.css';

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#003057',
        color: '#FFFFFF',
        fontWeight: 'bold',
        margin: '5vh',
        width: '12vw',
        fontSize: '1.25rem',
    }
});
const SSO = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    return (
        
        <div id = "fullscreen">
            <header>
                <div id="header-section">
                    <h2 id="header-words">Georgia Tech Login Service</h2>
                </div>
            </header>
            <div id = "boxes">
                <div id = "login-box">
                    <Box
                        sx={{
                            backgroundColor: '#EFEFEF',
                            borderColor: '#AAA',
                            boxShadow: 10,
                            margin: 'auto',
                            innerHeight: 600,
                            paddingTop: 10
                        }}
                        
                        >
                            <h2>Enter your GT Account and Password</h2>

                            <div>
                                <TextField

                                label="GT Account"
                                id="username"

                                size="25"
                                backgroundColor= '#E8F0FE'
                                borderColor = '#ccc'
                                />
                            </div>

                            <div>
                                <TextField
                                label="Password"
                                id="password"

                                size="25"
                                backgroundColor= '#E8F0FE'
                                borderColor = '#ccc'
                                />
                            </div>

                            <Button href="#" className={classes.btn} variant="outlined" onClick={() => {navigate('/qr-instructions')}}> Login </Button>
                    </Box>
                </div>

                <div id = "terms-box">
                    <Box
                        sx={{
                            backgroundColor: '#F8E0A0',
                            boxShadow: 10,
                            margin: 'auto',
                            innerHeight: 600,
                            paddingTop: 10
                            
                        }}
                        
                        >
                        <p>
                            <b>ATTENTION:</b><br />
                            When you are finished using all of your 
                            authenticated applications, please log out 
                            of this system and exit your browser to ensure 
                            you do not leave any of your applications (such as 
                            your e-mail) open to other users of this machine.
                        </p>
                        <br />
                        <p>
                            <b>TERMS OF USE:</b><br />
                            This computer system is the property of the Georgia Institute of Technology. 
                            Any user of this system must comply with all Institute and Board of Regents 
                            policies, including the Acceptable Use Policy, Cyber Security Policy and Data 
                            Privacy Policy. Users should have no expectation of privacy, as any and all 
                            files on this system may be intercepted, monitored, recorded, copied, 
                            inspected, and/or disclosed to authorized personnel in order to meet Institute obligations.
                            By using this system, I acknowledge and consent to these terms.
                        </p>
                    </Box>
                </div>
            </div>

        </div>
    );
}

export default SSO;