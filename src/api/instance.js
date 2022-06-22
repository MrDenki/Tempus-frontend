import axios from "axios";

// const API_URL = 'http://localhost:5000'
const API_URL = 'http://10.0.90.227:5000'

export const instance = axios.create({
    baseURL: API_URL
})