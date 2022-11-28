import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/other/ErrorPage';
import Home from './pages/home/Home';
// import ManageVotes from '../../server/backend/ManageVotes';
import SSO from './pages/student-pages/sso/SSO'

// Student imports
import QRScanner from './pages/student-pages/qr-scanner/QRScanner';
import QRInstructions from './pages/student-pages/qr-instructions/QRInstructions';
import QRConfirmation from './pages/student-pages/qr-confirmation/QRConfirmation';
import VotingPage from './pages/student-pages/voting-page/VotingPage';
import VotingConfirmation from './pages/student-pages/voting-confirmation/VotingConfirmation';

// Instructor imports
import AdminPath from './pages/administrator-pages/admin-home/AdminPath';

import AdminLogIn from './pages/administrator-pages/admin-login/AdminLogIn';

import CreateEvent from './pages/administrator-pages/create-event/CreateEvent';
import ManageEvent from './pages/administrator-pages/manage-event/ManageEvent';
import EventScreen from './pages/administrator-pages/manage-event/EventScreen';
import AdminHome from './pages/administrator-pages/admin-home/AdminHome';
import EventData from './services/EventData';

import { EventsContext } from './context/EventsContext';
import { useEventsContext } from './hooks/useEventsContext';



const App = () => {
    //ManageVotes.run();
    // var edata = new EventData();
    // console.log(edata.getEvents());

    // const [events, setevents] = useState(null);


    //WHY DOESNT THIS WORK
    //I DONT UNDERSTAND
    const {events, dispatch} = useEventsContext();
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('http://localhost:3001/api/getevent');
            const json = await response.json();
            
            if (response.ok) {
                dispatch({type: 'SET_EVENT', payload: json})
            }
        }

        fetchEvents();
    }, [dispatch])
    

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<ErrorPage />}/>


                {/* Student paths */}
                <Route path="/SSO" element={<SSO />}/>
                <Route path="/qr-scanner" element={<QRScanner />}/>
                <Route path="/qr-instructions" element={<QRInstructions />}/>
                <Route path="/qr-confirmation" element={<QRConfirmation />}/>
                <Route path="/voting-page/:id" element={<VotingPage />}/>
                <Route path="/voting-confirmation/" element={<VotingConfirmation />}/>

                {/* Administrator paths */}
                <Route path="/admin" element={<AdminPath />}/>
                <Route path="/admin-login" element={<AdminLogIn />}/>
                <Route path="/admin-home" element={<AdminHome />}/>
                <Route path="/create-event" element={<CreateEvent />}/>
                <Route path="/manage-event" element={<ManageEvent />}/>
                <Route path="/event-screen/:id" element={<EventScreen />}/>
            </Routes>
        </Router>
    );
}

export default App;