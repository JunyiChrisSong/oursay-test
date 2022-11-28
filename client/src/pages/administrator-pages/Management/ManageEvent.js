// import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import EventBanner from './EventBanner';

// var page = 0;
// const sampleBanner = {
//     name: "Test event",
//     id: 1
// }
// const sample2 = {
//     name: "Test 2",
//     id: 2
// }

// // const ManageEvent = () => {
//     let navigate = useNavigate();
//     var banners = [sampleBanner, sample2];
//     function deleteNote(id) {
//         return;
//     }
//     function seeNote(id) {
//         navigate('/event-screen');
//         return;
//     }
//     return (
//         <div class="admin_default">
//             <h1>Instructors, manage your event here!</h1>
//             <div class="banner_container">
                
//                 {banners.map((item) => {
//                     return (
//                     <EventBanner
//                     name={item.name}
//                     id={item.id}
//                     onDelete={deleteNote(item.id)}
//                     // onSee={seeNote(item.id)}
//                     onSee = {seeNote}
//                     />
//                 );
//             })}
//             </div>
//         </div>
            
        
//     );
// }

// export default ManageEvent;