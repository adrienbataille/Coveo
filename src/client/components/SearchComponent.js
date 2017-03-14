import './app.scss'
import React, { Component } from 'react';
import { Filter } from '../utils';
import FilterComponent from './FilterComponent';
import OrderingGroupComponent from './OrderingGroupComponent';
import { Button, Checkbox } from 'semantic-ui-react';
import { CoveoSearch } from '../service';

export default class SearchComponent extends Component {
    filters = {};
    state = { advancedSearch: false }
    componentDidMount() {
        this.props.searchFilters.forEach(x => {
            this.filters[x.name] = new Filter(x.formattedValue);
        })
    }

    buildQuery() {
        let query = '';
        for (let x in this.filters) {
            let formattedValue = this.filters[x].getFormattedValue();
            if (formattedValue) {
                query += ` ${formattedValue}`
            }
        }
        return query;
    }

    onSearch(e, value) {
        let query = this.buildQuery();
        if (query.length < 1) {
            return;
        }

        CoveoSearch.search(query, this.state.sortCriteria, (err, res) => {
            this.props.onResults(res.body.results)
        })
    }

    search(query, sortCriteria) {
    }
    updateFilter(filterKey, value) {
        this.filters[filterKey].setValue(value)
    }

    updateSortCriteria(value) {
        this.setState({sortCriteria : value})
    }

    onAdvancedSearchCheckChange(event, data) {
        this.setState({ advancedSearch: data.checked })
    }

    render() {
        return (
            <div>
                {this.props.searchFilters.map((x => {
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
                }).bind(this))}
                <Checkbox label='Advanced' toggle onChange={this.onAdvancedSearchCheckChange.bind(this)} />
                <div>
                    <Button content='Search' onClick={this.onSearch.bind(this)} />
                </div>
                <OrderingGroupComponent onChange={this.updateSortCriteria.bind(this)} sortCriterias={this.props.sortCriterias}/>
            </div>
        );
    }
}
