import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'

export default class FilterComponent extends Component {
    onInputChanged(event, data) {
        this.props.onChange(this.props.filterKey, data.value)
    }
    render() {
        return (
            <Input placeholder={this.props.placeholder}
                type={this.props.type ? this.props.type : 'text'}
                onChange={this.onInputChanged.bind(this)} />)
    }
}