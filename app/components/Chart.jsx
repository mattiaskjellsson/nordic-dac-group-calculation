import React, { Component } from 'react';

export default class Chart extends Component {
  render() {
    return (
      <div>
        <img src="graph-placeholder.jpg" alt="graph placeholder"/>
      </div>
    )
  }
}

Chart.defaultProps = {
  removalYears: 0,
  emissionsToRemove: 0,
  historicalEmissions: 0,
  annualEmissions: 0,
  annualRefund: 0,
  annualRefundIncrease: 0,
}
