import React, { Component } from 'react';

import StyledSlider from './StyledSlider';

export default class CalculationCalculation extends Component {
  constructor(props) {
    super(props);
    this.handleRefundIncreaseChange = this.handleRefundIncreaseChange.bind(this);
    this.handleRemovalYearsChange = this.handleRemovalYearsChange.bind(this);
    this.handlePlanchange = this.handlePlanchange.bind(this);
    this.props = {
      plan: 'sameAmount',
    }

    this.state = {
      plan: this.props.plan,
    };
  }

  handleRefundIncreaseChange(e) {
    this.props.onRefundIncreaseChange(e)
  }

  handleRemovalYearsChange(e) {
    this.props.onRemovealYearsChange(e);
  }

  handlePlanchange(e) {
    this.setState({
      plan: e.target.value
    });
    this.props.onHandlePlanChange(e.target.value);
  }
  
  render() {
    return (
      <div>
        <div className="radius bordered shadow card">
          <div className="card-divider">
            Calculation
          </div>
          <div className="card-section">
            <h4 className="input-header">Refund of emissions percent increase</h4>
            <p className="input-breadcrumbs">The company's gool to improve and increase every year in percent</p>
            <StyledSlider min={0} max={100} step={1} defaultValue={0} unit={'%'} onChange={this.handleRefundIncreaseChange} />

            <h4 className="input-header">Removal years</h4>
            <p className="input-breadcrumbs">Specify how many years that reduction should last before the company is climate neutral</p>
            <StyledSlider min={1} max={100} step={1} defaultValue={1} unit={'y'} onChange={this.handleRemovalYearsChange} />

            <h4 className="input-header">Choose your plan for CO<sub>2</sub> Removal</h4>
            <p className="input-breadcrumbs">Want to pay the same amount every year or less from the beginning and more at the end?</p>
            <select className="input-select" id="plan" onChange={this.handlePlanchange} defaultValue={this.state.plan}>
              <option value="sameAmount">Same amount</option>
              <option value="progressiveAmount">Progressive</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

CalculationCalculation.defaultProps = {
  plan: 'sameAmount',
};

CalculationCalculation.defaultState = {
  plan: CalculationCalculation.defaultProps.plan,
};
