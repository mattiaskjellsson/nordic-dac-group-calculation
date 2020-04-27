import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class CalculationEmissions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="radius bordered shadow card">
        <div className="card-divider">
          Emissions
        </div>
        <div className="card-section">
          <h4 className="display-header">Emission year</h4>
          <p className="display-value"><NumberFormat value={this.props.yearlyEmissions} displayType={'text'} thousandSeparator={true} decimalScale={0} /> t CO<sub>2</sub></p>
          <h4 className="display-header">Historical emissions</h4>
          <p className="display-value"><NumberFormat value={this.props.historicalEmissions} displayType={'text'} thousandSeparator={true} decimalScale={0} /> t C0<sub>2</sub></p>
          <h4 className="display-header">Refund emissions</h4>
          <p className="display-value"><NumberFormat value={this.props.refundEmissions} displayType={'text'} thousandSeparator={true} decimalScale={0} /> t CO<sub>2</sub></p>
          <h4 className="display-header">DAC Gap emissions</h4>
          <p className="display-value"><NumberFormat value={ this.props.yearlyEmissions + this.props.historicalEmissions - this.props.refundEmissions } displayType={'text'} thousandSeparator={true} decimalScale={0} /> t CO<sub>2</sub></p>
        </div>
      </div>
    )
  }
}

CalculationEmissions.defaultProps = {
  yearlyEmissions: 0,
  historicalEmissions: 0,
  refundEmissions: 0,
}