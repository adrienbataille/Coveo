import React, { Component } from 'react';
import {  Radio } from 'semantic-ui-react'

/**
 * Class representing an ordering component
 * 
 * @export
 * @class OrderingComponent
 * @extends {Component}
 */
export default class OrderingComponent extends Component {
    /**
     * Function to render the OrderingComponent
     * 
     * @returns the rendered component
     * 
     * @memberOf OrderingComponent
     */
    render() {
        return <Radio
            label={this.props.name}
            name={this.props.name}
            value={this.props.name}
            checked={this.props.checked}
            onChange={this.props.onChange} />
    }
}