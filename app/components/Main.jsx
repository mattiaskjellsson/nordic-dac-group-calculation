import Axios from 'axios';
import React, { Component } from 'react';

import CalculationCalculation from './CalculationCalculation';
import CalculationEmissions from './CalculationEmissions';
import CalculationSettings from './CalculationSettings';
import CalculationValues from './CalculationValues';
import Chart from './Chart';
import FrontrunnerCosts from './FrontrunnerCosts';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    
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

    this.handlePlanChange = this.handlePlanChange.bind(this);
    this.handleProgressiveAmountChange = this.handleProgressiveAmountChange.bind(this);
  }

  getInitialState() {
    return {
      annualEmissions: 0,
      historicalEmissions: 0,
      refundEmissions: 0,
      refundIncrease: 0,
      removalYears: 1,
      removalPlan: 'sameAmount',
    };
  }

  componentDidMount() {
    this.serverRequest = Axios.get(this.props.source)
    .then(res => {
      const r = res.data;
      this.setState({
          annualEmissions: r.sliderValues.annualEmissions.min,
          historicalEmissions: r.sliderValues.historicalEmissions.min,
          refundEmissions: r.sliderValues.annualRefund.min,
          refundIncrease: r.sliderValues.annualRefund.min,
          refundQuantity: r.sliderValues.annualRefund.min,
          removalYears: r.sliderValues.removalYears.min,
          // TODO:: Make dynamic as well...
          annualCosts: 0,
          optionMonthsCost: 0,
          administrationCost: 0,
          totalCost: 0,
          removalPlan: 'sameAmount',
          // Previously props
          co2TonnePrice: r.baseData.co2TonnePrice,
          administration: r.baseData.administrationCostPerTonne,
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
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
    this.setState({ removalPlan: e});
  }

  handleProgressiveAmountChange(e) {
    this.setState({
      progressiveIncrease: e
    });
  }

  refundQuantity() {
    // The refund increase is for the whole period.
    const totalRefundedYear2toEnd = (this.state.refundEmissions * (1.0 + 1.0 * (this.state.refundIncrease/100.0))) * (this.state.removalYears - 1);
    const totalRefundedYear1 = this.state.refundEmissions;
    
    var totalRefunded = 0;
    if (this.state.removalYears > 1) {
      totalRefunded = totalRefundedYear1 + totalRefundedYear2toEnd;
    } else {
      totalRefunded = totalRefundedYear1;
    }

    this.setState({
      refundQuantity: totalRefunded
    });
  }

  emissionsToRemove() {
    const emissions = (this.state.removalYears * this.state.annualEmissions) + this.state.historicalEmissions;
    const toRemove = emissions - this.state.refundQuantity;
    
    this.setState({emissionsToRemove: toRemove});
  }

  annualCosts() {
    //({total_emissions_to_remove}*{Price_co2_tonne}) / ({removal_years})*1000
    const cost = this.state.emissionsToRemove * this.state.co2TonnePrice / this.state.removalYears;
    if(typeof cost !== 'number') { cost = 0; }

    this.setState({
      annualCosts: cost
    });
  }

  optionMonthsCost() {
    // {total_gap_cost}*{Price_co2_tonne}*1000/12
    const cost = this.state.annualCosts / 12;
    if(typeof cost !== 'number') { cost = 0; }

    this.setState({
      optionMonthsCost: cost
    });
  }

  administrationCost() {
    // {total_emissions_to_remove}*{Administration}*1000
    const cost = (this.state.emissionsToRemove * this.state.administration);
    if (typeof cost !== 'number') { cost = 0; }

    this.setState({
      administrationCost: cost
    });
  }

  totalCost() {
    // {Administration} + {program_size}*{removal_years}
    const cost = 
    this.state.administrationCost + this.state.annualCosts * this.state.removalYears;
    if (typeof cost !== 'number') { cost = 0; }

    this.setState({
      totalCost: cost
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
      <div className="calculation-application">
        <div className="grid-x">
          <div class="cell large-3 medium-2 small-0"></div>
          <div className="large-6 medium-8 small-12">
            <CalculationSettings 
              onYearlyEmissionsChange={this.handleYearlyEmissionChanged}
              onHistoricalEmissionsChange={this.handleHistoricalEmissionsChanged}
              onRefundEmissionsChange={this.handleRefundEmissionsChanged}
            />
            <CalculationEmissions 
              yearlyEmissions={this.state.annualEmissions} 
              historicalEmissions={this.state.historicalEmissions} 
              refundEmissions={this.state.refundEmissions}
            />
            <CalculationCalculation 
              onRefundIncreaseChange={this.handleRefundIncreaseChanged}
              onRemovealYearsChange={this.handleRemovalYearsChanged}
              onHandlePlanChange={this.handlePlanChange}
              onHandleProgressiveAmountChange={this.handleProgressiveAmountChange}
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
            <Chart 
              removalYears={this.state.removalYears}
              emissionsToRemove={this.state.emissionsToRemove}
              historicalEmissions = {this.state.historicalEmissions}
              annualEmissions = {this.state.annualEmissions}
              annualRefund = {this.state.refundEmissions}
              annualRefundIncrease = {this.state.refundIncrease}
              removalPlan = {this.state.removalPlan}
              progressiveIncrease = {this.state.progressiveIncrease}
            />
          </div>
          <div class="cell large-3 medium-2 small-0"></div>
        </div>
      </div>
    );
  }
};

Main.defaultProps = {
  source: "./data.json"
}
