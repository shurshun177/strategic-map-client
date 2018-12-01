import axios from 'axios';

export default function RestAPI(baseUrl='/api/v0') {
    let configs = {
        baseURL: baseUrl,
        timeout: 1000,
        headers: {'Content-Type': 'application/json'}
    };
    return axios.create(configs);
}