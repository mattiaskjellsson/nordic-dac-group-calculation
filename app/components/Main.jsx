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
  }

  handleYearlyEmissionChanged(e) {
    this.setState({annualEmissions: e});
  }

  handleHistoricalEmissionsChanged(e) {
    this.setState({historicalEmissions: e});
    
  }

  handleRefundEmissionsChanged(e) {
    this.setState({refundEmissions: e});
    this.refundQuantity();
  }

  handleRefundIncreaseChanged(e) {
    this.setState({refundIncrease: e});
    this.refundQuantity();
  }

  handleRemovalYearsChanged(e) {
    this.setState({removalYears: e});
    this.refundQuantity();
  }

  refundQuantity() {
    var years = 0;
    if (this.state.removalYears > 1) {
      years = this.state.removalYears-=1;
    } else if (this.state.removalYears === 1) {
      years = 1;
    }
    
    console.log(`Years ${years} RefundIncrease: ${this.state.refundIncrease} Refunded emissions ${this.state.refundEmissions}`);
    this.setState({
      refundQuantity: 
      years * (this.state.refundIncrease * 0.01) * this.state.refundEmissions
    });
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