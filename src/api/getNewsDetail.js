import axios from "axios";
import endpoint from "./endpoint"

export default (id) => {
    const url = `${endpoint.endpoint}/v0/item/${id}.json`;
    return axios.get(url);
}