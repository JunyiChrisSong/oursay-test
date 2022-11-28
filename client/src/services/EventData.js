import React from "react";
import http from './http-common';

// const http = new HTTP();







export default {
    //Returns all events as a json file
    //See dummydata in backend for structure of data
    async getEvents() {
        // var a = http.get('/getevent');
        // console.log(typeof a);
        var response = await fetch('http://localhost:3001/api/getevent');
        var result;
        const json = await response.json().then(j => {console.log(j);console.log("hi");result = j});
        return result;
        // const [events, setevents] = useState(null);
    },
    setUpEffects() {
        const fetchEvents = async () => {
            const response = await fetch('http://localhost:3001/api/getevent');
            const json = await response.json();
            if (response.ok) {
                // setevents(json);
            }
        }

        fetchEvents();
        // console.log(events);
    },
    //creates an event with given data (json)
    //Again, see dummydata in backend for an example of the correct format
    async createEvent(data) {
        const response = await fetch('http://localhost:3001/api/postevent', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        const json = await response.json();
        return json;
        // return http.post("/postevent", data)
    },
    async updateEvent(data) {
        const response = await fetch('http://localhost:3001/api/update/' + data._id, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        const json = await response.json();
        return json;
        // return http.post("/postevent", data)
    }

}