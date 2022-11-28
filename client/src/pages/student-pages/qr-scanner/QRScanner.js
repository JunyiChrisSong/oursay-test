import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import './stylesQRScanner.css'; 

const App = (props) => {
  const [data, setData] = useState('No result');
  let navigate = useNavigate();

  return (
    <div className="center">
        <h1>Use Camera to Verify the QR Code</h1>
        <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
                navigate('/qr-confirmation')
              }

              if (!!error) {
                console.info(error);
              }
            }}
        />
    </div>

  );
};


// go to the next page
export default App;

