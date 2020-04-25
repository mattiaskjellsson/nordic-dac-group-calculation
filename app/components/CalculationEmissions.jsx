import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class CalculationEmissions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="radius bordered shadow card">
        <div class="card-divider">
          Emissions
        </div>
        <div class="card-section">
          <h4>Emission year</h4>
          <p>
            <NumberFormat value={this.props.yearlyEmissions} displayType={'text'} thousandSeparator={true} decimalScale={0} /> Mt CO<sub>2</sub>
          </p>
          <h4>Historical emissions</h4>
          <p>
            <NumberFormat value={this.props.historicalEmissions} displayType={'text'} thousandSeparator={true} decimalScale={0} /> Mt C0<sub>2</sub>
          </p>
          <h4>Refund emissions</h4>
          <p>
            <NumberFormat value={this.props.refundEmissions} displayType={'text'} thousandSeparator={true} decimalScale={0} /> Mt CO<sub>2</sub>
          </p>
          <h4>DAC Gap emissions</h4>
          <p>
            <NumberFormat value={ this.props.yearlyEmissions + this.props.historicalEmissions - this.props.refundEmissions } displayType={'text'} thousandSeparator={true} decimalScale={0} /> Mt CO
          </p>
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