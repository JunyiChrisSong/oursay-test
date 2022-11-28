import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core'
import "./styles.css"

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#FFFFFF',
        color: '#B3A369',
        fontWeight: 'bold',
        margin: "2px"
    }
});


function AdminHome() {
    const classes = useStyles();

    let navigate = useNavigate();
    return (
        <div>
            <h1>Welcome Dr. HB!</h1>
            <Button variant="contained" className={classes.btn} onClick={() => {navigate('/create-event')}}>create an event</Button>
            <Button variant="contained" className={classes.btn} onClick={() => {navigate('/manage-event')}}>manage an event</Button>
        </div>
    );
}

export default AdminHome;