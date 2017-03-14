class Filters {
    Default = 'Default';
    Category = 'Category';
    Country = 'Country';
    MinPrice = 'MinPrice';
    MaxPrice = 'MaxPrice';
    BottleFormat = 'BottleFormat';

    Types = [
        this.Default,
        this.Category,
        this.Country,
        this.MinPrice,
        this.MaxPrice,
        this.BottleFormat
    ]

    FormattedValues = new Map([
        [this.Default, x => x],
        [this.Category, x => `@tpcategorie~="${x}"`],
        [this.Country, x => `@tppays="${x}"`],
        [this.MinPrice, x => `@tpprixnum>=${x}`],
        [this.MaxPrice, x => `@tpprixnum<=${x}`],
        [this.BottleFormat, x => `@tpformat=${x}`]
    ])
}

let instance = new Filters();

export default instance;