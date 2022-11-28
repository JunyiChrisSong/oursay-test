import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Button, Radio, RadioGroup, FormControl, FormControlLabel, ThemeProvider, Box, makeStyles, StylesProvider} from '@material-ui/core'
import './styles.css';
import { useEventsContext } from '../../../hooks/useEventsContext';
import  TeamVotingList   from '../../../components/TeamVoteList';
// import {TeamBanners} from '../../../components/TeamBanner';
import { useParams } from 'react-router-dom';

var eventNumber = 1;

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#003057',
        color: '#FFFFFF',
        fontWeight: 'bold',
        padding: '1.5vh',
        boxShadow: '1vh',
        margin: '3vh',
        width: '15vw',
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

const VotingPage = () => {
    let navigate = useNavigate();
    const classes = useStyles();
    const { events, dispatch } = useEventsContext()
    GetEvent();
    const [selected, setSelected] = useState('');


    const params = useParams()
    var id = parseInt(params.id)

    async function handleVote() {
        console.log(selected);
        var resultJson;
        events.map(event => {
            if (event._id == id) {
                resultJson = event;
            }
        })
        console.log(resultJson.teams[selected])
        resultJson.teams[selected][1] = parseInt(resultJson.teams[selected][1])+1;
        console.log(JSON.stringify(resultJson))
        const obj = JSON.stringify(resultJson);
        console.log(obj)
        
        const fetchEvents = async () => {
            //TODO: Change this to a dedicated student vote function
            var response = await fetch('http://localhost:3001/api/update/' + id, {
                method: 'POST',
                body: obj,
                headers: {
                    'Content-Type': 'application/json'
                  }
            });
            const json = await response.json()
            console.log(json)


            if (response.ok) {
                dispatch({type: 'SET_EVENTS', payload: json})
            }
        }

        fetchEvents()
        
        navigate(`/voting-confirmation#${eventNumber}`);
    }

    var handleChange = ev => {
        
        setSelected(ev.target.value);
    };


    return (
        <div>
            <img src={require('../../../resources/voting-progress.png')} alt="Check In Progress Bar" className="progress-bar-check-in" />

            <h1>Select Your Favorite Team Number</h1>
            

            <div >
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={handleChange.bind(this)}
                >

                    <TeamVotingList eventid={id} />

                    
                </RadioGroup>
                </FormControl>
            </div>

            <ThemeProvider>
            <Button href="#" className={classes.btn} variant="contained" onClick={() => {handleVote()}}> Submit </Button>

            </ThemeProvider>
        </div>
    );
}

export default VotingPage;


//<FormControlLabel control={<Radio />} label={<Box component="div" fontSize={24}>Team 3</Box>} />
//<FormControlLabel control={<Radio />} label={<Box component="div" fontSize={24}>Team 3</Box>} />
