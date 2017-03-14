import './app.scss'
import React, { Component } from 'react';
import SearchComponent from './SearchComponent';
import { Button, Card, Image } from 'semantic-ui-react'

// Dummy test data
let searchFilters = [
    { name: 'Keywords', placeholder: 'Keywords ...', formattedValue: (x => x) },
    { name: 'Category', placeholder: 'Alcohol Type', formattedValue: (x => `@tpcategorie~="${x}"`), advanced: true },
    { name: 'Country', placeholder: 'Country', formattedValue: (x => `@tppays="${x}"`), advanced: true },
    { name: 'MinPrice', type: 'number', placeholder: 'MinPrice', formattedValue: (x => `@tpprixnum>=${x}`), advanced: true },
    { name: 'MaxPrice', type: 'number', placeholder: 'MaxPrice', formattedValue: (x => `@tpprixnum<=${x}`), advanced: true },
];

// Dummy test data
let sortCriterias = [
    { name: 'Relevancy', formattedValue: x => '', disableOrdering: true },
    { name: 'Price', formattedValue: x => `@tpprixnum ${x}` },
    { name: 'Date', formattedValue: x => `@sysdate ${x}` }
]

/**
 * Class to demonstrate teh use of the component
 * 
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {

    /**
     * 
     * 
     * 
     * @memberOf App
     */
    componentWillMount() {
        this.setState({ results: [] })
    }

    /**
     * Function called when we have results from the search component
     * 
     * @param {any} results
     * 
     * @memberOf App
     */
    onResults(results) {
        this.setState({ results: results })
    }

    /**
     * 
     * 
     * @returns
     * 
     * @memberOf App
     */
    render() {
        return (
            <div className='app' >
                <SearchComponent searchFilters={searchFilters} sortCriterias={sortCriterias} onResults={this.onResults.bind(this)} />
                
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
