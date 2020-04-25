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

    this.annualCosts = this.annualCosts.bind(this);
    this.optionMonthsCost = this.optionMonthsCost.bind(this);
    this.administrationCost = this.administrationCost.bind(this);
    this.totalCost = this.totalCost.bind(this);
    this.updateCosts = this.updateCosts.bind(this);
  }

  handleYearlyEmissionChanged(e) {
    this.setState({annualEmissions: e});
    this.emissionsToRemove();
    this.updateCosts();
  }

  handleHistoricalEmissionsChanged(e) {
    this.setState({historicalEmissions: e});
    this.emissionsToRemove();
    this.updateCosts();
  }

  handleRefundEmissionsChanged(e) {
    this.setState({refundEmissions: e});
    this.refundQuantity();
    this.emissionsToRemove();
    this.updateCosts();
  }

  handleRefundIncreaseChanged(e) {
    this.setState({refundIncrease: e});
    this.refundQuantity();
    this.emissionsToRemove();
    this.updateCosts();
  }

  handleRemovalYearsChanged(e) {
    this.setState({removalYears: e});
    this.refundQuantity();
    this.emissionsToRemove();
    this.updateCosts();
  }

  handlePlanChange(e) {
    console.log(`Handle plan change: ${e}`);
  }

  refundQuantity() {
    this.setState({
      refundQuantity: 
      (this.state.removalYears * (this.state.refundIncrease * 0.01) * this.state.refundEmissions)
    });
  }

  emissionsToRemove() {
    const yearlyEmissionsGap = this.state.annualEmissions - this.state.refundEmissions;
    const emissions = (this.state.removalYears * yearlyEmissionsGap);
    const toRemove = emissions + this.state.historicalEmissions - this.state.refundQuantity;
    
    this.setState({emissionsToRemove: toRemove});
  }

  annualCosts() {
    //({total_emissions_to_remove}*{Price_co2_tonne}) / ({removal_years})*1000
    const cost = this.state.emissionsToRemove * this.props.co2TonnePrice / this.state.removalYears;
    if(typeof cost !== 'number') { cost = 0; }

    this.setState({
      annualCosts:
      cost
    });
  }

  optionMonthsCost() {
    // {total_gap_cost}*{Price_co2_tonne}*1000/12
    const totalGapCost = 
      (this.state.annualEmissions - this.state.refundEmissions)
      - (this.state.refundEmissions * (1.000 + (this.state.refundIncrease / 100.000)) * this.state.removalYears) 
      + this.state.historicalEmissions;

    const cost = totalGapCost * this.props.co2TonnePrice / 12;
    if(typeof cost !== 'number') { cost = 0; }

    this.setState({
      optionMonthsCost:
      cost
    });
  }

  administrationCost() {
    // {total_emissions_to_remove}*{Administration}*1000
    const cost = (this.state.emissionsToRemove * this.props.administration) * 1000;
    if (typeof cost !== 'number') { cost = 0; }

    this.setState({
      administrationCost:
      cost
    });
  }

  totalCost() {
    // {Administration} + {program_size}*{removal_years}
    const cost = 
    this.state.administrationCost + this.state.annualCosts * this.state.removalYears;
    if (typeof cost !== 'number') { cost = 0; }

    this.setState({
      totalCost:
      cost
    });
  }

  updateCosts() {
    this.annualCosts();
    this.optionMonthsCost();
    this.administrationCost();
    this.totalCost();
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
            onHandlePlanChange={this.handlePlanChange}
          />
          <CalculationValues 
            refundQuantity={this.state.refundQuantity}
            yearsBeforeNeutral={this.state.removalYears}
            emissionsToRemove={this.state.emissionsToRemove}
          />
          <FrontrunnerCosts 
            annualCosts={this.state.annualCosts}
            optionMonthsCost={this.state.optionMonthsCost}
            administrationCost={this.state.administrationCost}
            totalCost={this.state.totalCost}
          />
        </div>
        <div class="cell large-3 medium-2 small-0"></div>
      </div>
    );
  }
};

Main.defaultProps = {
  co2TonnePrice: 300000,
  administration: 1,
  programSize: 10,
};

Main.defaultState = {
  annualEmissions: 0,
  historicalEmissions: 0,
  refundEmissions: 0,
  refundIncrease: 0,
  removalYears: 1,
  annualCosts: 0,
  optionMonthsCost: 0,
  administrationCost: 0,
  totalCost: 0,
};
