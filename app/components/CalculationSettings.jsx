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
          <p className="input-breadcrumbs">The company's current total emissions per year in Megaton</p>
          <StyledSlider min={0} max={100} step={1} defaultValue={0} unit={'Mt'} onChange={this.handleAnnualEmissionsChange} />

          <h4 className="input-header">Refund of emissions</h4>
          <p className="input-breadcrumbs">The company's internal opportunity to repay carbon dioxide per year through its own activities and measures in Megaton.</p>
          <StyledSlider min={0} max={100} step={1} defaultValue={0}  unit={'Mt'} onChange={this.handleRefundEmissionsChange}/>

          <h4 className="input-header">Historical emission</h4>
          <p className="input-breadcrumbs">The Company's historical emissions up to today in Megaton</p>
          <StyledSlider min={0} max={1000} step={1} defaultValue={0}  unit={'Mt'} onChange={this.handleHistoricalEmissionsChange}/>
        </div>
      </div>
    )
  }
}
