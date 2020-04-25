import React, { Component } from 'react';

export default class CalculationValues extends Component {
  constructor(props) {
    super(props);
    this.climateNeutral = this.climateNeutral.bind(this);
  }

  climateNeutral() {
    if(this.props.yearsBeforeNeutral < 1) return '';

    return new Date().getFullYear() + this.props.yearsBeforeNeutral;
  }

  render() {
    const refund = this.props.refundQuantity.toPrecision(3);
    const emissions = this.props.emissionsToRemove.toPrecision(3);
    return (
        <div class="radius bordered shadow card">
          <div class="card-divider">
            Values
          </div>
          <div class="card-section">
            <h4>Refund quantity</h4>
            <p>{ refund } Mt CO<sub>2</sub></p>
            <h4>Years before neutral</h4>
            <p>{ this.props.yearsBeforeNeutral } Years</p>
            <h4>Emissions to remove</h4>
            <p>{ emissions } Mt CO<sub>2</sub></p>
            <h4>Climate neutral</h4>
            <p>{ this.climateNeutral() }</p>
          </div>
        </div>
    );
  }
}

CalculationValues.defaultProps = {
  refundQuantity: 0,
  yearsBeforeNeutral: 0,
  emissionsToRemove: 0,
}
