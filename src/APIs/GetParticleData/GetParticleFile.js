import axios from 'axios';
import fileDownload from 'js-file-download';
import { baseUrl } from '../BaseUrl';
import { toStringByFormatting } from '../../Commons/TimeFormatter/TimeFormatter';

export default async function getParticleFile(startDate, endDate) {
    try {
        const body = {
            start: toStringByFormatting(startDate),
            end: toStringByFormatting(endDate),
        };
        axios
            .get(baseUrl + '/logs/file/particle', {
                responseType: 'blob',
                params: body,
            })
            .then(res => {
                fileDownload(res.data, 'particle.csv');
            });
    } catch (e) {
        return e;
    }
}
