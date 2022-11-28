import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, makeStyles} from '@material-ui/core'
import {useEventsContext} from '../../../hooks/useEventsContext.js';


import './styles.css';
const useStyles = makeStyles({
    btn: {
        backgroundColor: '#003057',
        color: '#FFFFFF',
        fontWeight: 'bold',
        margin: '3rem',
        padding: '1.5rem',
        fontSize: '1.5rem'
       
    }
});

var eventNumber = 1;

function GetEvent(props) {
    const { events, dispatch } = useEventsContext();
    
    React.useEffect(() => {
        const fetchEvents = async () => {
            var response = await fetch('http://localhost:3001/api/getevent');
            const json = await response.json()

            // What does this do?
            if (response.ok) {
                dispatch({type: 'SET_EVENTS', payload: json})
            }
        }

        fetchEvents()
    }, [dispatch])

    if (events) {
        for (var i = 0; i < events.length; i++) {
            if (events[i].open === true && events[i]._id === 1) {
                eventNumber = events[i]._id;
            }
        }
    }
}

const QRConfirmation = () => {
    let navigate = useNavigate();
    const classes = useStyles();
    GetEvent();
    return (
        <div>
            <h1>QR Check-In Successful!</h1>
            <p>Click "Next" to Enter<br />the Voting Screen</p>
            <Button href="#" className={classes.btn} variant="contained" onClick={() => {navigate(`/voting-page/${eventNumber}`)}}>Next</Button>
        </div>
    );
}

export default QRConfirmation;