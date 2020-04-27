import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

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
    const refund = this.props.refundQuantity;
    const emissions = this.props.emissionsToRemove;
    return (
        <div className="radius bordered shadow card">
          <div className="card-divider">
            Values
          </div>
          <div className="card-section">
            <h4 className="display-header">Refund quantity</h4>
            <p className="display-value">
              <NumberFormat value={refund} displayType={'text'} thousandSeparator={true} decimalScale={0} /> t CO<sub>2</sub>
            </p>
            <h4 className="display-header">Years before neutral</h4>
            <p className="display-value">
              <NumberFormat value={this.props.yearsBeforeNeutral} displayType={'text'} thousandSeparator={true} decimalScale={0} /> Years
            </p>
            <h4 className="display-header">Emissions to remove</h4>
            <p className="display-value">
              <NumberFormat value={emissions} displayType={'text'} thousandSeparator={true} decimalScale={0} /> t CO<sub>2</sub>
            </p>
            <h4 className="display-header">Climate neutral</h4>
            <p className="display-value">
              <NumberFormat value={this.climateNeutral()} displayType={'text'} thousandSeparator={false} decimalScale={0} />
            </p>
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
