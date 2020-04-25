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
        <div className="radius bordered shadow card">
          <div className="card-divider">
            Values
          </div>
          <div className="card-section">
            <h4 className="display-header">Refund quantity</h4>
            <p className="display-value">{ refund } Mt CO<sub>2</sub></p>
            <h4 className="display-header">Years before neutral</h4>
            <p className="display-value">{ this.props.yearsBeforeNeutral } Years</p>
            <h4 className="display-header">Emissions to remove</h4>
            <p className="display-value">{ emissions } Mt CO<sub>2</sub></p>
            <h4 className="display-header">Climate neutral</h4>
            <p className="display-value">{ this.climateNeutral() }</p>
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
