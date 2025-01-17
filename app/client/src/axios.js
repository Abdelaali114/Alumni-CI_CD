import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://app-server-1:3001/api/",
  withCredentials: true,
});



