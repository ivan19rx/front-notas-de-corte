import axios from "axios";

export const api = new axios.create({
    baseURL: "https://prova-lab-software.onrender.com"
})