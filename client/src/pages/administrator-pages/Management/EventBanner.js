import React from "react";
import DeleteIcon from "@material-ui/icons/Delete"
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"
function EventBanner(props) {
    function handleClick() {
        props.onDelete(props.id);
    }
    function seeEvent() {
        props.onSee(props.id);
    }

    return (
        <div className="grid-banner">
            <div className="event grid-banner grid-item">
            <div className="grid-item">
                {props.name}
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

export default EventBanner;