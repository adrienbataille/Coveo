import Filter from './filter'

it('Filter returns expected format value', () => {
    let format = x => `test ${x}`;
    let filter = new Filter(format);
    filter.setValue('test');
    let formattedValue = filter.getFormattedValue();
    expect(typeof formattedValue).toEqual('string');
    expect(formattedValue).toEqual('test test');
});

it('Filter returns null when no value', () => {
    let format = x => `test ${x}`;
    let filter = new Filter(format);
    let formattedValue = filter.getFormattedValue();
  expect(formattedValue).toEqual(null);
});

it('Filter returns null when empty value', () => {
    let format = x => `test ${x}`;
    let filter = new Filter(format);
    filter.setValue('');
    let formattedValue = filter.getFormattedValue();
    expect(formattedValue).toEqual(null);
});

it('Filter returns value when invalid format', () => {
    let filter = new Filter();
    filter.setValue('test');
    let formattedValue = filter.getFormattedValue();
    expect(formattedValue).toEqual('test');
});