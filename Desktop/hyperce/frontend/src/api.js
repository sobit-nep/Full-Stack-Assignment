// src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',  // Replace with your Django backend URL
});

export default instance;
