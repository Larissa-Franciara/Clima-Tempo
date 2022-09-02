import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/",
    body: JSON.stringify({
        "id": null,
        "author": "",
        "mensagem": ""
    })
});

export default api
