import React from "react";
import {useEventsContext} from '../hooks/useEventsContext'
import {Radio, FormControlLabel, Box, RadioGroup, FormControl} from '@material-ui/core'


function TeamVotingList(props) {
    const { events, dispatch } = useEventsContext();
    var i = parseInt(props.eventid)

    React.useEffect(() => {
        const fetchEvents = async () => {
            var response = await fetch('http://localhost:3001/api/getevent');
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_EVENTS', payload: json})
            }
        }

        fetchEvents() 
    }, [dispatch])
    
    return (
        
        <div>
        {events && events.map(event => (
            <div>
            {event._id === i && event.teams.map(e => (
                <div class="choice-container">
                    <FormControlLabel value={"" + e[2]} control={<Radio />} label={<Box component="div" fontSize={30}>Team {e[3]}</Box>} />
                </div>
            ))
            }            
            </div>
        ))}
        </div>
      )
}


export default TeamVotingList