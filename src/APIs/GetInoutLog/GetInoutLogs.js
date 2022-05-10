import axios from 'axios';
import { baseUrl } from '../BaseUrl';

export default async function getInoutLogs() {
    try {
        const res = await axios.get(baseUrl + '/logs/log', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (e) {
        return e;
    }
}
