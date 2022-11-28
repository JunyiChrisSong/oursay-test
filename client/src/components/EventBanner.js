import React from "react";
import DeleteIcon from "@material-ui/icons/Delete"
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
import {useEventsContext} from '../hooks/useEventsContext'
import { useNavigate } from "react-router-dom";
import { Button, makeStyles, StylesProvider } from '@material-ui/core'
import "./styles.css"

function EventBanner(props) {
    const { dispatch } = useEventsContext()
    let navigate = useNavigate();
    async function handleClick() {
        const response = await fetch('http://localhost:3001/api/deleteevent/' + props.data._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        dispatch({type: 'DELETE_EVENT', payload: json})
        // props.onDelete(props.id);
    }
    function seeEvent() {
        navigate('/event-screen/' + props.data._id);
        // props.onSee(props.id);
    }
    return (
        <div className="grid-banner">
            <div className="event grid-banner grid-item">
            <div className="grid-item, btn">
                {/* props.data.teams.length */}
                {"Event: " + props.data._id }
            </div>

            <button className="deleteButton grid-item" onClick={handleClick}>
                <DeleteIcon />
            </button>
            </div>

            <div className="grid-banner grid-item"><button className="nextButton" onClick={seeEvent}>
                <ArrowForwardIos/>
            </button></div>
        </div>
        
    );
}

function EventBanners() {
    //TODO: Figure out why this doesnt work
    const { events, dispatch } = useEventsContext();
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
        <div className="events">
        {events && events.map(event => (
            <div>
            <EventBanner data={event} />
            {/* {event.teams.map(e => <EventBanner data={e}></EventBanner>)} */}
            
            </div>
        ))}
        </div>
      )
}

export default EventBanners;