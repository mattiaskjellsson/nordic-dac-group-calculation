import React, { Component } from 'react';

import CalculationCalculation from './CalculationCalculation';
import CalculationEmissions from './CalculationEmissions';
import CalculationSettings from './CalculationSettings';
import CalculationValues from './CalculationValues';
import FrontrunnerCosts from './FrontrunnerCosts';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annualEmissions: 0,
      historicalEmissions: 0,
      refundEmissions: 0,
      refundIncrease: 0,
      removalYears: 0,
    };

    this.handleYearlyEmissionChanged = this.handleYearlyEmissionChanged.bind(this);
    this.handleHistoricalEmissionsChanged = this.handleHistoricalEmissionsChanged.bind(this);
    this.handleRefundEmissionsChanged = this.handleRefundEmissionsChanged.bind(this);
    this.handleRefundIncreaseChanged = this.handleRefundIncreaseChanged.bind(this);
    this.handleRemovalYearsChanged = this.handleRemovalYearsChanged.bind(this);
    this.refundQuantity = this.refundQuantity.bind(this);
    this.emissionsToRemove = this.emissionsToRemove.bind(this);
  }

  handleYearlyEmissionChanged(e) {
    this.setState({annualEmissions: e});
    this.emissionsToRemove();
  }

  handleHistoricalEmissionsChanged(e) {
    this.setState({historicalEmissions: e});
    this.emissionsToRemove();
  }

  handleRefundEmissionsChanged(e) {
    this.setState({refundEmissions: e});
    this.refundQuantity();
    this.emissionsToRemove();
  }

  handleRefundIncreaseChanged(e) {
    this.setState({refundIncrease: e});
    this.refundQuantity();
    this.emissionsToRemove();
  }

  handleRemovalYearsChanged(e) {
    this.setState({removalYears: e});
    this.refundQuantity();
    this.emissionsToRemove();
  }

  refundQuantity() {
    this.setState({
      refundQuantity: 
      this.state.removalYears * (this.state.refundIncrease * 0.01) * this.state.refundEmissions
    });
  }

  emissionsToRemove() {
    const yearlyEmissionsGap = this.state.annualEmissions - this.state.refundEmissions;
    const emissions = (this.state.removalYears * yearlyEmissionsGap);
    const toRemove = emissions + this.state.historicalEmissions - this.state.refundQuantity;
    console.log(`YearlyEmissionsGap: ${yearlyEmissionsGap}`);
    console.log(`emissions: ${emissions}`);
    console.log(`toRemove: ${toRemove}`);
    this.setState({emissionsToRemove: toRemove});
  }

  render() {
    return (
      <div className="grid-x">
        <div class="cell large-3 medium-2 small-0"></div>
        <div className="large-6 medium-8 small-12">
          <CalculationSettings 
            onYearlyEmissionsChange={this.handleYearlyEmissionChanged}
            onHistoricalEmissionsChange={this.handleHistoricalEmissionsChanged}
            onRefundEmissionsChange={this.handleRefundEmissionsChanged} />
          <CalculationEmissions 
            yearlyEmissions={this.state.annualEmissions} 
            historicalEmissions={this.state.historicalEmissions} 
            refundEmissions={this.state.refundEmissions}/>
          <CalculationCalculation 
            onRefundIncreaseChange={this.handleRefundIncreaseChanged}
            onRemovealYearsChange={this.handleRemovalYearsChanged}
          />
          <CalculationValues 
            refundQuantity={this.state.refundQuantity}
            yearsBeforeNeutral={this.state.removalYears}
            emissionsToRemove={this.state.emissionsToRemove}
          />
          <FrontrunnerCosts />
        </div>
        <div class="cell large-3 medium-2 small-0"></div>
      </div>
    );
  }
};

Main.defaultState = {
  annualEmissions: 0,
  historicalEmissions: 0,
  refundEmissions: 0,
  refundIncrease: 0,
  removalYears: 0,
}