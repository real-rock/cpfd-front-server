import axios from 'axios';
import fileDownload from 'js-file-download';
import { baseUrl } from '../BaseUrl';

export default async function getInoutLogsToFile() {
    try {
        axios
            .get(baseUrl + '/logs/file', {
                responseType: 'blob',
            })
            .then(res => {
                fileDownload(res.data, 'test.csv');
            });
    } catch (e) {
        return e;
    }
}
