import React from 'react';
import { useParams } from 'react-router-dom';
import TeamBanners from '../../../components/TeamBanner';
// import csvData from '../../../components/csvData';
import CsvSection from '../../../components/CsvSection';
import { CSVLink, CSVDownload } from "react-csv";
import "../styles.css";
import {Button, ThemeProvider, makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
    btn: {
        backgroundColor: '#FFFFFF',
        color: '#B3A369',
        fontWeight: 'Bold',
        margin: '1vh',
        width: '19vw',
        fontSize: '2vw'
    }
});

const EventScreen = () => {
    const classes = useStyles();
    const params = useParams()
    var id = parseInt(params.id)
    // async function endEvent() {
    //     console.log("hello")
    // }
    console.log("id" + id)

    return (
        
        <div className="admin_default">
        <h1>Expo Voting Results </h1>
        

        <div className="scrolldiv">
            <TeamBanners eventid={id}/>
        </div>
        <div className = "eventScreenButtonContainer">
            <CsvSection data={id}/> 
            {/* <button className="event-button">Edit Votes</button> */}
            <Button variant="contained" className={classes.btn}>Edit Votes</Button>

        </div>


    </div>);
}


export default EventScreen;