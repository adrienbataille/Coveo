import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import OrderingComponent from './OrderingComponent';

export default class OrderingGroupComponent extends Component {
    sortCriterias = {};
    disableOrdering = new Set();

    componentWillMount() {
        this.state = {}
        this.props.sortCriterias.forEach((x => {
            this.sortCriterias[x.name] = x.formattedValue;
            if (x.disableOrdering === true) {
                this.disableOrdering.add(x.name)
            }
            if (!this.state.sortCriteria) {
                this.state = { 
                    ascending: false, 
                    sortCriteria: this.props.defaultSortCriteria ? this.props.defaultSortCriteria : x.name 
                }
            }
        }).bind(this))

        this.updateSortCriteria(this.state.sortCriteria);
    }

    onSortCriteriaChanged = (e, { value }) => {
        this.updateSortCriteria(value);
    }

    updateSortCriteria(sortCriteria) {
        this.setState({ sortCriteria: sortCriteria });
        if (this.state.ascending === true) {
            this.props.onChange(this.sortCriterias[sortCriteria]('ascending'));
        }
        if (this.state.ascending === false) {
            this.props.onChange(this.sortCriterias[sortCriteria]('descending'));
        }
    }

    updateSortCriteriaOrder(ascending) {
        if (ascending === true) {
            this.props.onChange(this.sortCriterias[this.state.sortCriteria]('ascending'));
        }
        if (ascending === false) {
            this.props.onChange(this.sortCriterias[this.state.sortCriteria]('descending'));
        }
    }

    render() {
        return (
            <div>
                {this.props.sortCriterias.map(x => {
                    return <OrderingComponent
                        key={x.name}
                        name={x.name}
                        checked={this.state.sortCriteria === x.name}
                        onChange={this.onSortCriteriaChanged.bind(this)} />
                })}
                <Button
                    disabled={this.disableOrdering.has(this.state.sortCriteria)}
                    icon={this.state.ascending === true ? 'long arrow up' : 'long arrow down'}
                    onClick={(() => {
                        this.setState({ ascending: !this.state.ascending })
                        this.updateSortCriteriaOrder(!this.state.ascending)
                    }).bind(this)} />
            </div>

        )
    }
}