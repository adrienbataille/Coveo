import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Ordering } from '../constants';
import OrderingComponent from './OrderingComponent';

export default class OrderingGroupComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { ascending: false, value: Ordering.Relevancy }
    }

    handleChange = (e, { value }) => {
        this.setState({ value })
        this.props.onChange(Ordering.FormattedValues.get(value)(this.state.ascending))
    }

    render() {
        return (
            <div>
                <OrderingComponent
                    name={Ordering.Relevancy}
                    checked={this.state.value === Ordering.Relevancy}
                    onChange={this.handleChange.bind(this)} />
                {this.props.fields.map(x => {
                    return <OrderingComponent
                        key={x}
                        name={x}
                        checked={this.state.value === x}
                        onChange={this.handleChange.bind(this)} />
                })}
                <Button
                    disabled={this.state.value === Ordering.Relevancy}
                    icon={this.state.ascending === true ? 'long arrow up' : 'long arrow down'}
                    onClick={() => {
                        this.setState({ ascending: !this.state.ascending })
                        this.props.onChange(Ordering.FormattedValues.get(this.state.value)(!this.state.ascending))
                    }} />
            </div>

        )
    }
}