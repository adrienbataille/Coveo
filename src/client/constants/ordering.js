class Ordering {
    Price = 'Price';
    Date = 'Date';
    Relevancy = 'Relevancy';

    Fields = [
        this.Price,
        this.Date,
        this.Relevancy
    ]

    order(ascending){
        if(ascending === true){
            return 'ascending'
        }
        if(ascending === false){
            return 'descending'
        }
    } 
    
    FormattedValues = new Map([
        [this.Relevancy, x => ''],
        [this.Price, x => `@tpprixnum ${this.order(x)}`],
        [this.Date, x => `@sysdate ${this.order(x)}`]
    ])
}

let instance = new Ordering();

export default instance;