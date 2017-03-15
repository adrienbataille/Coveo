import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'

/**
 * Class representing a filter component
 * 
 * @export
 * @class FilterComponent
 * @extends {Component}
 */
export default class FilterComponent extends Component {
    /**
     * Function called when the input is changed
     * 
     * @param {any} event
     * @param {any} data
     * 
     * @memberOf FilterComponent
     */
    onInputChanged(event, data) {
        this.props.onChange(this.props.filterKey, data.value)
    }
    
    /**
     * Function to render the component
     * 
     * @returns
     * 
     * @memberOf FilterComponent
     */
    render() {
        return (
            <Input placeholder={this.props.placeholder}
                type={this.props.type ? this.props.type : 'text'}
                onChange={this.onInputChanged.bind(this)}
                className={this.props.className} />)
    }
}