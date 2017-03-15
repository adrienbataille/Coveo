import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import OrderingGroupComponent from './OrderingGroupComponent'

// Dummy test data
let sortCriterias = [
    { name: 'Relevancy', formattedValue: x => '', disableOrdering: true },
    { name: 'Price', formattedValue: x => `@tpprixnum ${x}` },
    { name: 'Date', formattedValue: x => `@sysdate ${x}` }
]

it('Renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OrderingGroupComponent sortCriterias={[]} onChange={() => { }} />, div);
});

it('OrderingGroupComponent shows the right amount of order filters', () => {
    const searchComponent = mount(
        <OrderingGroupComponent sortCriterias={sortCriterias} onChange={() => { }} />
    );
    expect(searchComponent.find('OrderingComponent').getNodes().length).toEqual(3);
})

it('OrderingGroupComponent when criteria has disabled ordering does not between ascending and descending order', () => {
    const searchComponent = mount(
        <OrderingGroupComponent defaultSortCriteria={'Relevancy'} sortCriterias={sortCriterias} onChange={() => { }} />
    );
    
    expect(searchComponent.state().ascending).toEqual(false);
    searchComponent.find('Button').simulate('click')
    expect(searchComponent.state().ascending).toEqual(false);
    searchComponent.find('Button').simulate('click')
    expect(searchComponent.state().ascending).toEqual(false);
})

it('OrderingGroupComponent switches between ascending and descending order', () => {
    const searchComponent = mount(
        <OrderingGroupComponent defaultSortCriteria={'Price'} sortCriterias={sortCriterias} onChange={() => { }} />
    );
    
    expect(searchComponent.state().ascending).toEqual(false);
    searchComponent.find('Button').simulate('click')
    expect(searchComponent.state().ascending).toEqual(true);
    searchComponent.find('Button').simulate('click')
    expect(searchComponent.state().ascending).toEqual(false);
})

it('OrderingGroupComponent switches between sorting criterias correctly', () => {
    const searchComponent = mount(
        <OrderingGroupComponent defaultSortCriteria={'Relevancy'} sortCriterias={sortCriterias} onChange={() => { }} />
    );
    
    expect(searchComponent.state().sortCriteria).toEqual('Relevancy');
    searchComponent.find('Radio').at(1).simulate('click')
    expect(searchComponent.state().sortCriteria).toEqual('Price');
    searchComponent.find('Radio').at(2).simulate('click')
    expect(searchComponent.state().sortCriteria).toEqual('Date');
    searchComponent.find('Radio').at(0).simulate('click')
    expect(searchComponent.state().sortCriteria).toEqual('Relevancy');
})