import axios from "axios";

export default axios.create({
    baseUrl: "http://localhost:3001/api",
    headers: {
        "Content-type": "application/json"
    }
});