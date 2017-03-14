export default class Filter {
    constructor(format) {
        this.format = format;
    }
    setValue(value) {
        this.value = value;
    }
    getFormattedValue() {
        if (this.value && this.value.length > 0) {
            return this.format(this.value);
        }
        return null;
    }
}