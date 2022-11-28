import React, {useRef} from 'react';
import { useParams } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
import {useEventsContext} from '../hooks/useEventsContext'
import { Fragment } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import styles from "../pages/administrator-pages/manage-event/styles.css";

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

function CsvSection(props) {
  const eventid = props.data;
  const classes = useStyles();

  var filename = "export.csv"
  const csvLink = useRef()

  const [csvData, setCsvData] = React.useState([]);
  const fetchEvents = async () => {
    var response = await fetch('http://localhost:3001/api/getevent');
    const json = await response.json()
    console.log("fetching events")
    var teamList = []

    if (response.ok) {
      for (var i = 0; i < json.length; i++){
        if(eventid === json[i]._id) {
          for(var j = 0; j < json[i].teams.length; j++) {
            console.log("team letter: " + json[i].teams[j][3])
            teamList.push(json[i].teams[j][3])
            console.log("team votes: " + json[i].teams[j][1])
            teamList.push(json[i].teams[j][1])
          }
        }
      }
      await setCsvData(teamList)
    }
  }


  async function asyncExportMethod() {
    await fetchEvents()
    csvLink.current.link.click();

  }

  return (
    // <button onClick={sayHello}>Default</button>;
    // <button className="event-button">Edit Votes</button>

    <div>

      <CSVLink
          data={csvData}
          // headers={headers || Object.keys(csvData[0])}
          className = 'hidden'
          filename={filename || 'export.csv'}
          ref={csvLink}
          style={{visibility: 'hidden'}}
        >Download
        </CSVLink>
        {/* <button
        onClick={() => {asyncExportMethod()}}
        className="event-button"
      >
      Click to Download CSV
      </button> */}
      <Button
        variant="contained"
        onClick={() => {asyncExportMethod()}}
        className={classes.btn}
      >
      CSV
      </Button>
    </div>)

}


export default CsvSection;