import { toStringByFormatting } from '../../Commons/TimeFormatter/TimeFormatter';
import axios from 'axios';
import { baseUrl } from '../BaseUrl';

export const getParticleData = async (
    startDate,
    endDate,
    setData,
    setError,
    setLoading,
) => {
    try {
        setError(null);
        setData(null);
        setLoading(true);

        const body = {
            start: toStringByFormatting(startDate),
            end: toStringByFormatting(endDate),
        };
        const response = await axios.get(baseUrl + '/logs/particle', {
            headers: {
                'Content-Type': 'application/json',
            },
            params: body,
        });
        setData(response.data);
    } catch (e) {
        setError(e);
    }
    setLoading(false);
};
