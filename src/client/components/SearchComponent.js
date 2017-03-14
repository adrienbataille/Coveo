import React, { Component } from 'react';
import { Filters, Ordering } from '../constants';
import { Filter } from '../utils';
import { CoveoSearch } from '../service';
import FilterComponent from './FilterComponent';
import OrderingGroupComponent from './OrderingGroupComponent';
import { Button, Card, Image, Checkbox, Divider } from 'semantic-ui-react'

export default class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.filters = {};
        this.order = '';
        Filters.Types.forEach(x => {
            this.filters[x] = new Filter(Filters.FormattedValues.get(x));
        })
    }

    componentWillMount() {
        this.reset();
    }

    buildQuery() {
        let query = '';
        for (let x in this.filters) {
            if (Filters.FormattedValues.has(x)) {
                let formattedValue = this.filters[x].getFormattedValue();
                if (formattedValue) {
                    query += ` ${formattedValue}`
                }
            }
        }
        return query;
    }

    buildSortCriteria() {
        return (this.state.order && this.state.order.length > 1)
            ? ` ${this.state.order}`
            : '';
    }

    reset() {
        this.setState({ results: [], filters: [] })
    }

    search(e, value) {
        var query = this.buildQuery();
        if (query.length < 1) {
            this.reset();
            return;
        }

        var sortCriteria = this.buildSortCriteria();
        CoveoSearch.search(query, sortCriteria, (err, res) => {
            this.setState({
                results: res.body.results,
            })
        })
    }

    updateFilter(filterKey, value) {
        this.filters[filterKey].setValue(value)
    }

    render() {
        let form = null;
        if (this.state.advancedSearch) {
            form = (
                <div>
                    <FilterComponent
                        placeholder='Max $'
                        filterKey={Filters.MaxPrice}
                        type='number'
                        onChange={this.updateFilter.bind(this)} />
                    <FilterComponent
                        placeholder='Min $'
                        filterKey={Filters.MinPrice}
                        type='number'
                        onChange={this.updateFilter.bind(this)} />
                    <FilterComponent
                        placeholder="Type d'alcool"
                        filterKey={Filters.Category}
                        onChange={this.updateFilter.bind(this)} />
                    <FilterComponent
                        placeholder='Pays'
                        filterKey={Filters.Country}
                        onChange={this.updateFilter.bind(this)} />
                    <OrderingGroupComponent fields={[Ordering.Price, Ordering.Date]} onChange={x => this.setState({ order: x })} />
                </div>
            )
        }
        else {
            form = (
                <div>
                    <FilterComponent
                        placeholder='Search'
                        filterKey={Filters.Default}
                        onChange={this.updateFilter.bind(this)} />
                </div>)
        }

        return (
            <div className='app' >
                {form}
                <Checkbox label='Advanced' toggle onChange={(event, data) => this.setState({ advancedSearch: data.checked })} />
                <Button content='Search' onClick={this.search.bind(this)} />

                <Divider />

                <Card.Group>
                    {this.state.results.map(x => {
                        return <Card
                            key={x.raw.tpcodesaq}>
                            <Image src={x.raw.tpthumbnailuri} />
                            <Card.Content>
                                <Card.Header>{x.title}</Card.Header>
                                <Card.Meta>{x.raw.tpcategorie}</Card.Meta>
                                <Card.Description>{x.raw.tppays}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {x.raw.tpprixnormal}
                                <Button content="Acheter" as='a' href={x.ClickUri} target='_blank' />
                            </Card.Content>
                        </Card>
                    })}
                </Card.Group>
            </div >
        );
    }
}
