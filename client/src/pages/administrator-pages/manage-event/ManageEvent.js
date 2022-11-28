import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventBanners from '../../../components/EventBanner';
import './styles.css'


const ManageEvent = () => {
    let navigate = useNavigate();
    function deleteNote(id) {
        return;
    }
    function seeNote(id) {
        navigate('/event-screen');
        return;
    }
    return (
        <div class="admin_default">
            <h1>Instructors, manage your events here!</h1>
            <div class="banner_container">
                <EventBanners />
                
            </div>
        </div>
            
        
    );
}

export default ManageEvent;