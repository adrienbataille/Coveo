import './app.scss'
import { Filter } from '../utils';
import React, { Component } from 'react';
import { CoveoSearch } from '../service';
import FilterComponent from './FilterComponent';
import { Button, Checkbox } from 'semantic-ui-react';
import OrderingGroupComponent from './OrderingGroupComponent';

/**
 * Class representing a search component that can have a normal and an advanced search
 * 
 * @export
 * @class SearchComponent
 * @extends {Component}
 */
export default class SearchComponent extends Component {
    /**
     * Serves as a dictionnary to store the different filters for the current search
     * 
     * 
     * @memberOf SearchComponent
     */
    filters = {};
    
    /**
     * State of the search component
     * holds the flag for the advanced search 
     * 
     * @memberOf SearchComponent
     */
    state = { advancedSearch: false }

    /**
     * Native function call when the component is about to get mounted
     * 
     * 
     * @memberOf SearchComponent
     */
    componentWillMount() {
        this.props.searchFilters.forEach(x => {
            this.filters[x.name] = new Filter(x.formattedValue);
        })
    }

    /**
     * Function to aggregate all the filters into building the query
     *  
     * @returns
     * 
     * @memberOf SearchComponent
     */
    buildQuery() {
        let query = '';
        for (let x in this.filters) {
            if (this.filters[x]) {
                let formattedValue = this.filters[x].getFormattedValue();
                if (formattedValue) {
                    query += ` ${formattedValue}`
                }
            }
        }
        return query;
    }

    /**
     * Function call when the search button is clicked
     * 
     * @param {any} e the event
     * @param {any} value state of the search buttons
     * @returns
     * 
     * @memberOf SearchComponent
     */
    onSearch(e, value) {
        let query = this.buildQuery();
        if (query.length < 1) {
            return;
        }

        CoveoSearch.search(query, this.state.sortCriteria, (err, res) => {
            this.props.onResults(res.body.results)
        })
    }

    /**
     * Function to update the value associated to a filter in the query
     * 
     * @param {any} filterKey
     * @param {any} value
     * 
     * @memberOf SearchComponent
     */
    updateFilter(filterKey, value) {
        this.filters[filterKey].setValue(value)
    }

    /**
     * Function to update the value associated to the sort criteria of the search
     * 
     * @param {any} value
     * 
     * @memberOf SearchComponent
     */
    updateSortCriteria(value) {
        this.setState({ sortCriteria: value })
    }

    /**
     * Function call when the advanced search checkbox is checked
     * 
     * @param {any} event
     * @param {any} data
     * 
     * @memberOf SearchComponent
     */
    onAdvancedSearchCheckChange(event, data) {
        this.setState({ advancedSearch: data.checked })
    }

    /**
     * Function to render the componentWillMount
     * 
     * @returns the rendered components
     * 
     * @memberOf SearchComponent
     */
    render() {
        return (
            <div>
                {this.props.searchFilters.map(x => {
                    if (x.advanced !== true || this.state.advancedSearch === true) {
                        return (
                            <div key={x.name}>
                                <FilterComponent
                                    placeholder={x.placeholder}
                                    filterKey={x.name}
                                    type={x.type}
                                    onChange={this.updateFilter.bind(this)} />
                            </div>)
                    }
                    return null;
                })}
                <Checkbox label='Advanced' toggle onChange={this.onAdvancedSearchCheckChange.bind(this)} />
                <div>
                    <Button content='Search' onClick={this.onSearch.bind(this)} />
                </div>
                <OrderingGroupComponent onChange={this.updateSortCriteria.bind(this)} sortCriterias={this.props.sortCriterias} />
            </div>
        );
    }
}
