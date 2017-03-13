import request from 'superagent';
import { API } from '../constants'

class CoveoSearch {
    search(queryString, callback) {
        request
            .get(API.Endpoint)
            .query({ access_token: API.AccessKey, q: queryString })
            .end(callback)
    }
}

export default new CoveoSearch();