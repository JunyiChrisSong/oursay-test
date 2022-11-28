import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core'


import './styles.css';

const useStyles = makeStyles({
    btn: {
        backgroundColor: '#003057',
        color: '#FFFFFF',
        fontWeight: 'bold',
        padding: '2vh',
        boxShadow: '1vh',
        margin: '1vh',
        width: '23vw',
        fontSize: '1.5rem'
       
    }
});
const QRInstructions = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    return (
        <div>
            {/* Get the path to the OurSay images in the resources folder */}
            <img src={require('../../../resources/checkin-progress.png')} alt="Check In Progress Bar" className="progress-bar-check-in" />
           
            <h1 className="instructionTitle">CHECK-IN INSTRUCTIONS<br />(QR Code Scanner)</h1>

            <p>1. Clicking "I Understand"<br />will open up your camera.<br /><br />
                2. Place the QR code within<br />the boundaries of the camera<br /><br />
                3. Wait for the camera to<br />register the QR code in order<br /> to verify your attendance.<br /><br />
                4. That's it! Happy expoing!</p>

            <div >
            <Button  href="#" className={classes.btn} variant="outlined" onClick={() => {navigate('/qr-scanner')}}> I Understand </Button>
            </div>
            


        </div>
    );
}

export default QRInstructions;