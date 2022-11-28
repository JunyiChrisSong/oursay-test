import React from "react";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
import {useEventsContext} from '../hooks/useEventsContext'
import "./styles.css"


function TeamBanner(props) {

    function handleClick() {
        props.onDelete(props.id);
    }
    function seeEvent() {
        props.onSee(props.id);
    }
    return (
        <div className="grid-banner">
            <div className="event grid-banner grid-item">
            <div className="grid-item, btn">
                {props.data[3] + ', Votes: ' + props.data[1]}
            </div>
            </div>

            <div className="grid-banner grid-item"><button className="nextButton" onClick={seeEvent}>
                <ArrowForwardIos/>
            </button></div>
        </div>
        
    );
}


function TeamBanners(props) {
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
        <div className="events">
        {events && events.map(event => (
            <div>
            {event._id === i && event.teams.map(e => (
                <div>
                <TeamBanner data={e}></TeamBanner>
                </div>
            ))
            }
            
            {/* <TeamBanner name={event}></TeamBanner> */}
            
            
            </div>
        ))}
        </div>
      )
}


export default TeamBanners