import React, { Component } from 'react';
import {  Radio } from 'semantic-ui-react'

export default class OrderingComponent extends Component {
    render() {
        return <Radio
            label={this.props.name}
            name={this.props.name}
            value={this.props.name}
            checked={this.props.checked}
            onChange={this.props.onChange} />
    }
}