import './app.scss'
import React, { Component } from 'react';
import { Ordering } from '../constants';
import { Filter } from '../utils';
import FilterComponent from './FilterComponent';
import OrderingGroupComponent from './OrderingGroupComponent';
import SearchComponent from './SearchComponent';
import { Button, Card, Image, Checkbox, Divider } from 'semantic-ui-react'

let searchFilters = [
    { name: 'Keywords', placeholder: 'Keywords ...', formattedValue: (x => x) },
    { name: 'Category', placeholder: 'Alcohol Type', formattedValue: (x => `@tpcategorie~="${x}"`), advanced: true },
    { name: 'Country', placeholder: 'Country', formattedValue: (x => `@tppays="${x}"`), advanced: true },
    { name: 'MinPrice', type: 'number', placeholder: 'MinPrice', formattedValue: (x => `@tpprixnum>=${x}`), advanced: true },
    { name: 'MaxPrice', type: 'number', placeholder: 'MaxPrice', formattedValue: (x => `@tpprixnum<=${x}`), advanced: true },
];

let sortCriterias = [
    { name: 'Relevancy', formattedValue: x => '', disableOrdering: true },
    { name: 'Price', formattedValue: x => `@tpprixnum ${x}` },
    { name: 'Date', formattedValue: x => `@sysdate ${x}` }
]

export default class App extends Component {
    filters = {};

    componentWillMount() {
        this.reset();
    }

    reset() {
        this.setState({ results: [], filters: [] })
    }


    onResults(results){
            this.setState({
                results: results
            })
    }

    render() {
        return (
            <div className='app' >
                <SearchComponent searchFilters={searchFilters} sortCriterias={sortCriterias} onSearch={this.onResults.bind(this)} />

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
                                <Button content="Buy" as='a' href={x.ClickUri} target='_blank' />
                            </Card.Content>
                        </Card>
                    })}
                </Card.Group>
            </div >
        );
    }
}
