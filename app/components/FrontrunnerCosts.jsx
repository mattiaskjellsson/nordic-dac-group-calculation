import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class FrontrunnerCosts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="radius bordered shadow card">
        <div className="card-divider">
          Frontrunner Program costs
        </div>
        <div className="card-section">
          <h4 className="display-header">Annual cost</h4>
          <p className="display-value"><NumberFormat value={this.props.annualCosts} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} /></p>
          <h4 className="display-header">Option Month's cost</h4>
          <p className="display-value"><NumberFormat value={this.props.optionMonthsCost} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} /></p>
          <h4 className="display-header">Adminstration cost</h4>
          <p className="display-value"><NumberFormat value={this.props.administrationCost} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} /></p>
          <h4 className="display-header">Total cost</h4>
          <p className="display-value"><NumberFormat value={this.props.totalCost} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} /></p>
        </div>
      </div>
    )
  }
}

FrontrunnerCosts.defaultProps = {
  annualCosts: 0,
  optionMonthsCost: 0,
  administrationCost: 0,
  totalCost: 0,
};
