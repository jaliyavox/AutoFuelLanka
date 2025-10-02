import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080", // Spring Boot
    headers: { "Content-Type": "application/json" }
});

export default http;
