import React, { Component } from 'react';

import StyledSlider from './StyledSlider';

export default class CalculationCalculation extends Component {
  constructor(props) {
    super(props);
    this.handleRefundIncreaseChange = this.handleRefundIncreaseChange.bind(this);
    this.handleRemovalYearsChange = this.handleRemovalYearsChange.bind(this);
  }

  handleRefundIncreaseChange(e) {
    this.props.onRefundIncreaseChange(e)
  }

  handleRemovalYearsChange(e) {
    this.props.onRemovealYearsChange(e);
  }
  
  render() {
    return (
      <div>
        <div class="radius bordered shadow card">
          <div class="card-divider">
            Calculation
          </div>
          <div class="card-section">
            <h4>Refund of emissions percent increase</h4>
            <p>The company's gool to improve and increase every year in percent</p>
            <StyledSlider min={0} max={100} step={1} defaultValue={0} onChange={this.handleRefundIncreaseChange} />

            <h4>Removal years</h4>
            <p>Specify how many years that reduction should last before the company is climate neutral</p>
            <StyledSlider min={0} max={100} step={1} defaultValue={0} onChange={this.handleRemovalYearsChange} />

          </div>
        </div>
        <div>
          <h4>Choose your plan for CO<sub>2</sub> Removal</h4>
          <p>Want to pay the same amount every year or less from the beginning and more at the end?</p>
          <select id="plan" onChange={this.onPlanchange} >
            <option value="volvo">Same amount</option>
            <option value="saab">Progressive</option>
          </select>
        </div>
      </div>
    )
  }
}

CalculationCalculation.defaultProps = {

};
