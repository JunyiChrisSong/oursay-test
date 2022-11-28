import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core'
import { useEventsContext } from '../../../hooks/useEventsContext';

import './styles.css';


var eventNumber = 1;

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#003057',
        color: '#FFFFFF',
        fontWeight: 'bold',
        padding: '2vh',
        boxShadow: '1vh',
        margin: '1vh',
        fontSize: '1.5rem'

    }
});

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

const VotingConfirmation = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    GetEvent();
    return (
        <div id = "items">
            <h1>Thank You for Voting!</h1>
            <p>Your Vote has Been Recorded!</p>
            <p>Feel Free to Change Your Vote<br />Until the Exposition is Over!</p>
            <Button href="#" className={classes.btn} variant="contained" onClick={() => {navigate(`/voting-page/${eventNumber}`)}}> Change My Vote </Button>
        </div>
    );
}

export default VotingConfirmation;