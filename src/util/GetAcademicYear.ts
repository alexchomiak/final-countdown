import { Response } from '../models/AcademicYearApi';
import Config from '../Config';

let cache: { timestamp: Date; data: Response };

const GetAcademicYear = async (): Promise<Response> => {
    const localCache = window.localStorage.getItem('academicYearCache');
    if (localCache) {
        cache = JSON.parse(localCache);
    }
    if (!cache || !cache.timestamp || +new Date() - +cache.timestamp > Config.cacheStaleThreshold) {
        cache = {
            data: await (await fetch('https://xorigin.azurewebsites.net/uicregistrar/assets/api/current-academic-year.json')).json(),
            timestamp: new Date(),
        };
        window.localStorage.setItem('academicYearCache', JSON.stringify(cache));
    }
    return cache.data;
};

export default GetAcademicYear;
