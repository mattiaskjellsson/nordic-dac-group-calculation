import Axios from 'axios';
import React, { Component } from 'react';

import StyledSlider from './StyledSlider';

export default class CalculationCalculation extends Component {
  constructor(props) {
    super(props);
    this.handleRefundIncreaseChange = this.handleRefundIncreaseChange.bind(this);
    this.handleRemovalYearsChange = this.handleRemovalYearsChange.bind(this);
    this.handlePlanchange = this.handlePlanchange.bind(this);
    this.renderProgressiveAmount = this.renderProgressiveAmount.bind(this);
    this.handleProgressiveIncreaseChange = this.handleProgressiveIncreaseChange.bind(this);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      plan: CalculationCalculation.defaultProps.plan,
      progressiveIncreaseValue: CalculationCalculation.defaultProps.progressiveIncreaseValue,
      yearUnitShort: 'y',
      texts: {
        header: "Calculation",
        refundIncrease: {
          header: "Refund of emissions percent increase",
          breadcrumbs: "The company's gool to improve and increase every year in percent"
        },
        removalYears: {
          header: "Removal years",
          breadcrumbs: "Specify how many years that reduction should last before the company is climate neutral",
          min: 0,
          max: 50,
          step: 1
        },
        removalPlan: {
          header: "Choose your plan for CO2 Removal",
          breadcrumbs: "Want to pay the same amount every year or less from the beginning and more at the end?",
          options: {
            same: {
              option: "Same amount"
            },
            progressive: {
              option: "Progressive",
              header: "Annual percentage increase",
              breadcrumbs: "Specify the relative increase in collected CO2 for years of the program, totalling the to the total emissions to collect"
            }
          }
        }
      }
    };
  }

  componentDidMount() {
    this.serverRequest = Axios.get(this.props.source)
    .then(res => {
      const r = res.data;
      this.setState({
        yearUnitShort: r.baseData.timeUnitShort,
        texts: {
          header: r.texts.calculation.header,
          refundIncrease: {
            header: r.texts.calculation.refundIncrease.header,
            breadcrumbs: r.texts.calculation.refundIncrease.breadcrumbs
          },
          removalYears: {
            header: r.texts.calculation.header,
            breadcrumbs: r.texts.calculation.breadcrumbs,
            min: r.sliderValues.removalYears.min,
            max: r.sliderValues.removalYears.max,
            step: r.sliderValues.removalYears.step
          },
          removalPlan: {
            header: r.texts.calculation.removalPlan.header,
            breadcrumbs: r.texts.calculation.removalPlan.breadcrumbs,
            options: {
              same: {
                option: r.texts.calculation.removalPlan.options.same.option
              },
              progressive: {
                option: r.texts.calculation.removalPlan.options.progressive.option,
                header: r.texts.calculation.removalPlan.options.progressive.header,
                breadcrumbs: r.texts.calculation.removalPlan.options.progressive.breadcrumbs
              }
            }
          }
        }
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
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
  
  handleProgressiveIncreaseChange(e) {
    this.setState({
      progressiveIncreaseValue: e
    });
    
    this.props.onHandleProgressiveAmountChange(e);
  }

  renderProgressiveAmount() {
    if (this.state.plan === 'progressiveAmount') {
      return (
        <div>
          <h4 className="input-header">
            {this.state.texts.removalPlan.options.progressive.header}
          </h4>
          <p className="input-breadcrumbs">
            {this.state.texts.removalPlan.options.progressive.breadcrumbs}
          </p>
          <StyledSlider 
            min={0}
            max={100} 
            step={1} 
            defaultValue={ this.state.progressiveIncreaseValue } 
            unit={'%'} 
            onChange={ this.handleProgressiveIncreaseChange } />
        </div>
      );
    }
  }
  
  render() {
    return (
      <div>
        <div className="radius bordered shadow card">
          <div className="card-divider">
            {this.state.texts.header}
          </div>
          <div className="card-section">
            <h4 className="input-header">
              {this.state.texts.refundIncrease.header}
            </h4>
            <p className="input-breadcrumbs">
              {this.state.texts.refundIncrease.breadcrumbs}
            </p>
            <StyledSlider 
              min={0} 
              max={100} 
              step={1} 
              defaultValue={0} 
              unit={'%'} 
              onChange={this.handleRefundIncreaseChange} />

            <h4 className="input-header">
              {this.state.texts.removalYears.header}
            </h4>
            <p className="input-breadcrumbs">
              {this.state.texts.removalYears.breadcrumbs}
            </p>
            <StyledSlider 
              min={this.state.texts.removalYears.min} 
              max={this.state.texts.removalYears.max} 
              step={this.state.texts.removalYears.step} 
              defaultValue={this.state.texts.removalYears.min} 
              unit={this.state.yearUnitShort} 
              onChange={this.handleRemovalYearsChange} />

            <h4 className="input-header">
              {this.state.texts.removalPlan.header}
            </h4>
            <p className="input-breadcrumbs">
              {this.state.texts.removalPlan.breadcrumbs}
            </p>
            <select 
              className="input-select" 
              id="plan" 
              onChange={this.handlePlanchange} 
              defaultValue={this.state.plan}>
              <option value="sameAmount">{this.state.texts.removalPlan.options.same.option}</option>
              <option value="progressiveAmount">{this.state.texts.removalPlan.options.progressive.option}</option>
            </select>

            { this.renderProgressiveAmount() }
          </div>
        </div>
      </div>
    )
  }
}

CalculationCalculation.defaultProps = {
  plan: 'sameAmount',
  progressiveIncreaseValue: 0,
  source: './data.json',
};


// CalculationCalculation.defaultState = {
//   plan: CalculationCalculation.defaultProps.plan,
//   progressiveIncreaseValue: CalculationCalculation.defaultProps.progressiveIncreaseValue,
// };
