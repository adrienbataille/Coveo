import request from 'superagent';
import { API } from '../constants'

class CoveoSearch {
    search(queryString, sortCriteria, callback) {
        request
            .get(API.Endpoint)
            .query({ access_token: API.AccessKey, q: queryString, sortCriteria: sortCriteria})
            .end(callback)
    }
}

export default new CoveoSearch();