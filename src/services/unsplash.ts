import axios from "axios";

const baseUrl = "https://api.unsplash.com";
const accessKey = "6J52208wl05_2MbxCThAKuKqomHAPOeqYXVrrgK4Fn4";

// Create an Axios instance with the Unsplash API configuration
const unsplash = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Client-ID ${accessKey}`,
  },
});

export default unsplash;
