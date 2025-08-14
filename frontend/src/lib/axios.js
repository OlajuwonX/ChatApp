import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api', //this is the backend server running.
    withCredentials: true, //this is to send the cookies on every request
}) //this is an instance we will use throughout the app.




//this is used in place of fetch, fetch is outdated and stressful