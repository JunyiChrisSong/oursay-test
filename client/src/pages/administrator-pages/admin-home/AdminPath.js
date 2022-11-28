import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core'
import "./styles.css";

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#FFFFFF',
        color: '#B3A369',
        fontWeight: 'bold',
        margin: "2px"
    }
});


function AdminPath() {
    let navigate = useNavigate();
    const classes = useStyles();

    return (
        <div>
            <h1>This is the Administrator Path</h1>
            <Button href="#" className={classes.btn} variant="contained" onClick={() => {navigate('/admin-login')}}>Click here to log in</Button>
        </div>
    );
}

export default AdminPath;