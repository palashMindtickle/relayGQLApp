const BASE_URL = 'https://benaam.checklist.mindtickle.com';
import { presentationData, allPresentations } from "./sampleData";
const fetchCommon = async ({method='GET', url, body }) => {
    const call =  fetch(url, {
        method,
        mode: 'no-cors',
        ...(body?({body: JSON.stringify(body)}):{})
    });
    return call;
}
export const getInsightsForPresentation = async presentationId => {
    return fetchCommon({url: `${BASE_URL}/insights/presentation/${presentationId}?`})
        .then(res => res.json())

}


export const getAllPresentations = async () => {
    return fetchCommon({url: `${BASE_URL}/presentation/getAll?`}).then(res => res.json());
}
