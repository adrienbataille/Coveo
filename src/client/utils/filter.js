/**
 * Represents a search filter
 * 
 * @export
 * @class Filter
 */
export default class Filter {
    /**
     * Creates an instance of Filter.
     * 
     * @param {function} format
     *  function to get a formatted string value of this filter
     * @memberOf Filter
     */
    constructor(format) {
        this.format = format;
    }
    
    /**
     * Sets the value attributed to the filter
     * 
     * @param {any} value
     * 
     * @memberOf Filter
     */
    setValue(value) {
        this.value = value;
    }

    /**
     * 
     * 
     * @returns {string}
     * A formatted string value of this filter
     * 
     * @memberOf Filter
     */
    getFormattedValue() {
        if (this.value && this.value.length > 0) {
            return this.format(this.value);
        }
        return null;
    }
}