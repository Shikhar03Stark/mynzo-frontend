import axios from "axios";
import endpoint from "./endpoint"

export default () => {
    const url = `${endpoint.endpoint}/v0/topstories.json`;
    return axios.get(url);
}