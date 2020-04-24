import React, { Component } from 'react';

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
          <p>{this.props.yearlyEmissions} Mt CO2</p>
          <h4>Historical emissions</h4>
          <p>{this.props.historicalEmissions} Mt C02</p>
          <h4>Refund emissions</h4>
          <p>{this.props.refundEmissions} Mt CO2</p>
          <h4>DAC Gap emissions</h4>
          <p>{this.props.yearlyEmissions + this.props.historicalEmissions - this.props.refundEmissions} Mt CO2</p>
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