import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class FrontrunnerCosts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="radius bordered shadow card">
          <div class="card-divider">
            Frontrunner Program costs
          </div>
          <div class="card-section">
            <h4>Annual cost</h4>
            <p>
              <NumberFormat value={this.props.annualCosts} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
            </p>
            <h4>Option Month's cost</h4>
            <p>
              <NumberFormat value={this.props.optionMonthsCost} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
            </p>
            <h4>Adminstration cost</h4>
            <p>
              <NumberFormat value={this.props.administrationCost} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
            </p>
            <h4>Total cost</h4>
            <p>
              <NumberFormat value={this.props.totalCost} displayType={'text'} thousandSeparator={true} decimalScale={0} prefix={'$'} />
            </p>
          </div>
        </div>
        <img src="graph-placeholder.jpg" alt="graph placeholder"/>
      </div>
    )
  }
}

FrontrunnerCosts.defaultProps = {
  annualCosts: 0,
  optionMonthsCost: 0,
  administrationCost: 0,
  totalCost: 0,
};
