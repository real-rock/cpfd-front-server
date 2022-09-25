import axios from 'axios';
import { baseUrl } from '../BaseUrl';
export default async function getInfo() {
    try {
        // eslint-disable-next-line no-useless-concat
        const res = await axios.get(baseUrl + '/logs/activity/state', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    } catch (e) {
        return e;
    }
}
