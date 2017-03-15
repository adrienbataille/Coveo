import './ordering-group-component.scss';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import OrderingComponent from './OrderingComponent';
/**
 * Class containing the controls to order the search
 * 
 * @export
 * @class OrderingGroupComponent
 * @extends {Component}
 */
export default class OrderingGroupComponent extends Component {
    /**
     * Field to hold the different possible sorting criterias for this search
     * 
     * 
     * @memberOf OrderingGroupComponent
     */
    sortCriterias = {};

    /**
     *  Set to hold the sort criterias that should not be ordered ascending or descending     * 
     * 
     * @memberOf OrderingGroupComponent
     */
    disableOrdering = new Set();

    /**
     * Function called when the componet is about to be mounted 
     * @memberOf OrderingGroupComponent
     */
    componentWillMount() {
        this.state = {}
        this.props.sortCriterias.forEach(x => {
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
        })

        this.updateSortCriteria(this.state.sortCriteria);
    }

    /**
     * Function called when the sorting criteria is changed
     * 
     * @memberOf OrderingGroupComponent
     */
    onSortCriteriaChanged = (e, { value }) => {
        this.updateSortCriteria(value);
    }

    /**
     * Function to update the current sorting critera 
     * @param {any} sortCriteria
     * 
     * @memberOf OrderingGroupComponent
     */
    updateSortCriteria(sortCriteria) {
        this.setState({ sortCriteria: sortCriteria });
        if (this.state.ascending === true) {
            this.props.onChange(this.sortCriterias[sortCriteria]('ascending'));
        }
        if (this.state.ascending === false) {
            this.props.onChange(this.sortCriterias[sortCriteria]('descending'));
        }
    }

    /**
     * Function to upfate the current sorting criteria order
     * 
     * @param {any} ascending
     * 
     * @memberOf OrderingGroupComponent
     */
    updateSortCriteriaOrder(ascending) {
        if (ascending === true) {
            this.props.onChange(this.sortCriterias[this.state.sortCriteria]('ascending'));
        }
        if (ascending === false) {
            this.props.onChange(this.sortCriterias[this.state.sortCriteria]('descending'));
        }
    }

    /**
     * Function to render the component
     * 
     * @returns the rendered component
     * 
     * @memberOf OrderingGroupComponent
     */
    render() {
        return (
            <div className='ordering-group-component'>
                {this.props.sortCriterias.map(x => {
                    return <OrderingComponent
                        className='ordering-component'
                        key={x.name}
                        name={x.name}
                        checked={this.state.sortCriteria === x.name}
                        onChange={this.onSortCriteriaChanged.bind(this)} />
                })}
                <Button
                    compact
                    color='teal'
                    disabled={this.disableOrdering.has(this.state.sortCriteria)}
                    icon={this.state.ascending === true ? 'long arrow up' : 'long arrow down'}
                    onClick={() => {
                        this.setState({ ascending: !this.state.ascending })
                        this.updateSortCriteriaOrder(!this.state.ascending)
                    }} />
            </div>

        )
    }
}

OrderingGroupComponent.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    sortCriterias: React.PropTypes.array.isRequired
};
