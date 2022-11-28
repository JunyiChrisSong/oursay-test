import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core'
import Papa from "papaparse";
import { useNavigate } from 'react-router-dom';
import json from './teamInformation.json';
import './styles.css'

const allowedExtensions = ["csv"];
const fs = require('fs');
var jsonCsvData = null;


const createEventBackend = async function(data) {
    var response = await fetch('http://localhost:3001/api/create', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
          }
    });
    const json = await response.json();
    console.log(response);
}

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#FFFFFF',
        color: '#B3A369',
        fontWeight: 'bold',
    }
});

const objectToCsv = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
};

const getReport = async function() {
    const downloadData = json.map(row => ({
        teamId: row.teamId,
        teamName: row.teamName,
    }));
    const csvData = objectToCsv(downloadData);
    download(csvData);
}

const download = function(downloadedData) {
    const blob = new Blob([downloadedData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
    

const CreateEvent = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");
    const [jsonData, setJsonData] = useState("");
    const handleFileChange = (e) => {
        const inputFile = e.target.files[0];
        const fileExtension = inputFile?.type.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            setError("Please input a csv file");
            return;
        }
        setFile(inputFile);
    };
    
    const handleParse = (e) => {
        // Prints out error if wrong file type
        if (!file) return setError("Enter a valid file");
        // Creates a file reader instance
        const reader = new FileReader();
        // When we get the file
        reader.onload = async ({ target }) => {
            // Parse the file (with the headers)
            const csv = Papa.parse(target.result, { 
                header: true,
            });
            // This works, & prints out the CSV file
            console.log(csv);

            // Converts the CSV to JSON
            jsonCsvData = JSON.stringify(csv);
            console.log(jsonCsvData);
            setJsonData(jsonCsvData);


            createEventBackend(jsonCsvData);

            
            // navigate('/manage-event');
        };
        reader.readAsText(file);    
    };

    const classes = useStyles();
    let navigate = useNavigate();


    return (
        <div>
            <h1 className='titleArea'>Event Creation</h1>
            <h2 className='subtitle'>Download your CSV template here:</h2>
            <div className="submit-button-styling">
                <Button variant="contained" onClick={getReport} className={classes.btn}>Download</Button>
            </div>
            <h2 className='subtitle'>Upload your CSV file here:</h2>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            />
            <div className="submit-button-styling">
                <Button variant="contained" onClick={handleParse} className={classes.btn}>Submit</Button>
            </div>
            <div style={{ marginTop: "2rem" }}>
                {error ? error : data.map((col,
                  idx) => <div key={idx}>{col}</div>)}
            </div>
            <p className="json-data-styling">
                {jsonData}
            </p>
        </div>
    );
}

export default CreateEvent;
export const JsonData = jsonCsvData;