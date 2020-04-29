import Axios from 'axios';
import React, { Component } from 'react';

import StyledSlider from './StyledSlider';

export default class CalculationSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleAnnualEmissionsChange = this.handleAnnualEmissionsChange.bind(this);
    this.handleRefundEmissionsChange = this.handleRefundEmissionsChange.bind(this);
    this.handleHistoricalEmissionsChange = this.handleHistoricalEmissionsChange.bind(this);
  }  

  getInitialState() {
    return {
      header: "Settings",
      unit: "t",
      annualEmissions: {
        header: "Annual emissions",
        breadcrumbs: "The company's current total emissions per year in ton",
        min: 0,
        max: 1000,
        step: 1,
      },
      annualRefund: {
        header: "Refund of emissions",
        breadcrumbs: "The company's internal opportunity to repay carbon dioxide per year through its own activities and measures in ton.",
        min: 0,
        max: 1000,
        step: 1
      },
      historicalEmissions: {
        header: "Historical emissions",
        breadcrumbs: "The Company's historical emissions up to today in ton",
        min: 0,
        max: 10000,
        step: 10
      }
    };
  }

  componentDidMount() {
    this.serverRequest = Axios.get(this.props.source)
    .then(res => {
      const r = res.data;
      this.setState({
        header: r.texts.settings.header,
        unit: r.baseData.co2Unit,
        annualEmissions: {
          header: r.texts.settings.annualEmissions.header,
          breadcrumbs: r.texts.settings.annualEmissions.breadcrumbs,
          min: r.sliderValues.annualEmissions.min,
          max: r.sliderValues.annualEmissions.max,
          step: r.sliderValues.annualEmissions.step
        },
        annualRefund: {
          header: r.texts.settings.annualRefund.header,
          breadcrumbs: r.texts.settings.annualRefund.breadcrumbs,
          min: r.sliderValues.annualRefund.min,
          max: r.sliderValues.annualRefund.max,
          step: r.sliderValues.annualRefund.step
        },
        historicalEmissions: {
          header: r.texts.settings.historicalEmissions.header,
          breadcrumbs: r.texts.settings.historicalEmissions.breadcrumbs,
          min: r.sliderValues.historicalEmissions.min,
          max: r.sliderValues.historicalEmissions.max,
          step: r.sliderValues.historicalEmissions.step
        }
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
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
          {this.state.header}
        </div>
        <div className="card-section">
          <h4 className="input-header">{this.state.annualEmissions.header}</h4>
          <p className="input-breadcrumbs">{this.state.annualEmissions.breadcrumbs}</p>
          <StyledSlider 
            min={this.state.annualEmissions.min} 
            max={this.state.annualEmissions.max} 
            step={this.state.annualEmissions.step} 
            defaultValue={this.state.annualEmissions.min} 
            unit={this.state.unit} 
            onChange={this.handleAnnualEmissionsChange} />

          <h4 className="input-header">
            {this.state.annualRefund.header}
          </h4>
          <p className="input-breadcrumbs">
            {this.state.annualRefund.breadcrumbs}  
          </p>
          <StyledSlider 
            min={this.state.annualRefund.min}
            max={this.state.annualRefund.max} 
            step={this.state.annualRefund.step} 
            defaultValue={this.state.annualRefund.min}
            unit={this.state.unit} 
            onChange={this.handleRefundEmissionsChange}/>

          <h4 className="input-header">
            {this.state.historicalEmissions.header}
          </h4>
          <p className="input-breadcrumbs">
            {this.state.historicalEmissions.breadcrumbs}
          </p>
          <StyledSlider 
            min={this.state.historicalEmissions.min}
            max={this.state.historicalEmissions.max}
            step={this.state.historicalEmissions.step}
            defaultValue={this.state.historicalEmissions.min}
            unit={this.state.unit}
            onChange={this.handleHistoricalEmissionsChange}/>
        </div>
      </div>
    )
  }
}

CalculationSettings.defaultProps = {
  source: "./data.json",
}