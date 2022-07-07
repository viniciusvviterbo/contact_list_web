import axios from "axios";

export const api_dotnet = axios.create({
    baseURL: process.env.REACT_APP_API_DOTNET,
});

export const api_nodejs = axios.create({
    baseURL: process.env.REACT_APP_API_NODEJS,
});
