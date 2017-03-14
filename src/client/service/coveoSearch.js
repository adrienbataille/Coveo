import request from 'superagent';
import { API } from '../constants'

/**
 * Class to communicate with the Coveo search API
 * 
 * @class CoveoSearch
 */
class CoveoSearch {
    /**
     * 
     * 
     * @param {any} queryString
     * @param {any} sortCriteria
     * @param {any} callback
     * 
     * @memberOf CoveoSearch
     */
    search(queryString, sortCriteria, callback) {
        request
            .get(API.Endpoint)
            .query({ access_token: API.AccessKey, q: queryString, sortCriteria: sortCriteria})
            .end(callback)
    }
}

export default new CoveoSearch();