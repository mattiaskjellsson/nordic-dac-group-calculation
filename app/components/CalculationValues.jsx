import Axios from 'axios';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class CalculationValues extends Component {
  constructor(props) {
    super(props);
    this.climateNeutral = this.climateNeutral.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      header: "Values",
      refundQuantity: "Refund quantity",
      yearsBeforeNeutral: "Years before neutral",
      emissionsToRemove: "Emissions to remove",
      climateNeutral: "Climate neutral",
      unit: "t",
      timeUnit: "Years",
    };
  }

  componentDidMount() {
    this.serverRequest = Axios.get(this.props.source)
    .then(res => {
      const r = res.data;
      this.setState({
        header: r.texts.values.header,
        refundQuantity: r.texts.values.refundQuantity,
        yearsBeforeNeutral: r.texts.values.yearsBeforeNeutral,
        emissionsToRemove: r.texts.values.emissionsToRemove,
        climateNeutral: r.texts.values.climateNeutral,
        unit: r.baseData.co2Unit,
        timeUnit: r.baseData.timeUnitLong,
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
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
            {this.state.header}
          </div>
          <div className="card-section">
            <h4 className="display-header">{this.state.refundQuantity}</h4>
            <p className="display-value">
              <NumberFormat 
                value={refund} 
                displayType={'text'} 
                thousandSeparator={true} 
                decimalScale={0} /> 
                {this.state.unit} CO<sub>2</sub>
            </p>
            <h4 className="display-header">{this.state.yearsBeforeNeutral}</h4>
            <p className="display-value">
              <NumberFormat 
                value={this.props.yearsBeforeNeutral} 
                displayType={'text'} 
                thousandSeparator={true} 
                decimalScale={0} /> 
                {this.state.timeUnit}
            </p>
            <h4 className="display-header">{this.state.emissionsToRemove}</h4>
            <p className="display-value">
              <NumberFormat 
                value={emissions} 
                displayType={'text'} 
                thousandSeparator={true} 
                decimalScale={0} />
                {this.state.unit} CO<sub>2</sub>
            </p>
            <h4 className="display-header">{this.state.climateNeutral}</h4>
            <p className="display-value">
              <NumberFormat value={this.climateNeutral()} 
                displayType={'text'} 
                thousandSeparator={false} 
                decimalScale={0} />
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
  source: "../react/data.json"
}
