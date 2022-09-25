import axios from 'axios';
import { baseUrl } from '../BaseUrl';
export default async function postActivity(name, action) {
    try {
        const body = {
            name,
            action,
        };
        // eslint-disable-next-line no-useless-concat
        const res = await axios.post(baseUrl + '/logs/activity', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return res.data;
    } catch (e) {
        return e;
    }
}
