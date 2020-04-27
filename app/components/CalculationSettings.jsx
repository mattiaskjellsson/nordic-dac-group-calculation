import React, { Component } from 'react';

import StyledSlider from './StyledSlider';

export default class CalculationSettings extends Component {
  constructor(props) {
    super(props);

    this.handleAnnualEmissionsChange = this.handleAnnualEmissionsChange.bind(this);
    this.handleRefundEmissionsChange = this.handleRefundEmissionsChange.bind(this);
    this.handleHistoricalEmissionsChange = this.handleHistoricalEmissionsChange.bind(this);
  }  

  handleAnnualEmissionsChange(e) {
    this.props.onYearlyEmissionsChange(e);
  }

  handleRefundEmissionsChange(e) {
    this.props.onRefundEmissionsChange(e);
  }

  handleHistoricalEmissionsChange(e) {
    this.props.onHistoricalEmissionsChange(e);
  }

  render() {
    return (
      <div className="radius bordered shadow card">
        <div className="card-divider">
          Settings
        </div>
        <div className="card-section">
          <h4 className="input-header">Annual emissions</h4>
          <p className="input-breadcrumbs">The company's current total emissions per year in ton</p>
          <StyledSlider min={0} max={10000} step={1} defaultValue={0} unit={'t'} onChange={this.handleAnnualEmissionsChange} />

          <h4 className="input-header">Refund of emissions</h4>
          <p className="input-breadcrumbs">The company's internal opportunity to repay carbon dioxide per year through its own activities and measures in ton.</p>
          <StyledSlider min={0} max={10000} step={1} defaultValue={0}  unit={'t'} onChange={this.handleRefundEmissionsChange}/>

          <h4 className="input-header">Historical emission</h4>
          <p className="input-breadcrumbs">The Company's historical emissions up to today in ton</p>
          <StyledSlider min={0} max={100000} step={1} defaultValue={0}  unit={'t'} onChange={this.handleHistoricalEmissionsChange}/>
        </div>
      </div>
    )
  }
}
