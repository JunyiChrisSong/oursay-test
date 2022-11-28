import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, ThemeProvider, makeStyles, DialogContent, DialogActions  } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import './styles.css';

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#FFFFFF',
        color: '#B3A369',
        fontWeight: 'bold',
    }
});


function AdminLogIn() {
    const [open, setOpen] = React.useState(false);

    let navigate = useNavigate();

    const[value, setValue] = useState("");
    
    const handleChange = event => {
        setValue(event.target.value);
        console.log(`Typed -> ${value}`);
    }

    const handleCheck = () => {
        if(value === "admin") {
            navigate('/admin-home');
        } else {
            setOpen(true);
            console.log("Wrong password");
        }
    }

    const classes = useStyles();

    return (
        <div>
            <div className="login-container">
                <div className="login-content">
                    <Dialog open={open}>
                        <DialogContent>Incorrect Security Key. Please try again.</DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>

                    <div className="login-header">
                        <h1>Enter your administrator login code</h1>
                    </div>
                    <div className="login-form">
                        <TextField id="outlined-basic" label="Admin Security Key" variant="outlined" onChange={handleChange} autoComplete="off"/>
                    </div>
                    <div className="login-button">
                        <ThemeProvider>
                            <Button variant="contained" onClick={handleCheck} className={classes.btn}>Submit</Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogIn;

