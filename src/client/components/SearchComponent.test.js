import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import SearchComponent from './SearchComponent'

// Dummy test data
let searchFilters = [
    { name: 'Keywords', placeholder: 'Keywords ...', formattedValue: (x => x) },
    { name: 'Category', placeholder: 'Alcohol Type', formattedValue: (x => `@tpcategorie~="${x}"`), advanced: true },
    { name: 'Country', placeholder: 'Country', formattedValue: (x => `@tppays="${x}"`), advanced: true },
    { name: 'MinPrice', type: 'number', placeholder: 'MinPrice', formattedValue: (x => `@tpprixnum>=${x}`), advanced: true },
    { name: 'MaxPrice', type: 'number', placeholder: 'MaxPrice', formattedValue: (x => `@tpprixnum<=${x}`), advanced: true },
];

it('Renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchComponent searchFilters={[]} sortCriterias={[]} onResults={() => { }} />, div);
});

it('Search component switches from default search default to advanced', () => {
    const searchComponent = mount(
        <SearchComponent searchFilters={[]} sortCriterias={[]} onResults={() => { }} />
    );
    expect(searchComponent.state().advancedSearch).toEqual(false);
    searchComponent.find('Checkbox').simulate('change');
    expect(searchComponent.state().advancedSearch).toEqual(true);
    searchComponent.find('Checkbox').simulate('change');
    expect(searchComponent.state().advancedSearch).toEqual(false);
})

it('Search component shows the right amount of search filters', () => {
    const searchComponent = mount(
        <SearchComponent searchFilters={searchFilters} sortCriterias={[]} onResults={() => { }} />
    );
    expect(searchComponent.find('FilterComponent').getNodes().length).toEqual(1);
    searchComponent.find('Checkbox').simulate('change');
    expect(searchComponent.find('FilterComponent').getNodes().length).toEqual(5);
})

// TODO test on if the search button does the correct thing
// it('Search component on search button click builds a query', () => {
//     const searchComponent = mount(
//         <SearchComponent searchFilters={searchFilters} sortCriterias={sortCriterias} onResults={() => { }} />
//     );
//     expect(searchComponent.state().query).toEqual(undefined);
//     searchComponent.find('Button').simulate('click');
//     expect(searchComponent.state()...).toEqual('...')
// })