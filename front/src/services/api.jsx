import axios from "axios";

export const api = new axios.create({
    baseURL: "https://notas-de-corte.onrender.com"
})