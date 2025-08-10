// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.0.100:5000", // Example: "http://192.168.1.5:5000"
});

export default API;
