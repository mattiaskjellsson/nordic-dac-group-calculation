import Axios from 'axios';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class CalculationEmissions extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      unit: "t",
      header: "Emissions",
      annualEmissionsHeader: "Emissions per year",
      historicalEmissionsHeader: "Historical emissions",
      refundEmissionsHeader: "Refund emissions",
      dacGapEmissionsHeader: "DAC Gap emissions",
    }
  }

  componentDidMount() {
    this.serverRequest = Axios.get(this.props.source)
    .then(res => {
      const r = res.data;
      this.setState({
        unit: r.baseData.co2Unit,
        header: r.texts.emissions.header,
        annualEmissionsHeader: r.texts.emissions.annualEmissionsHeader,
        historicalEmissionsHeader: r.texts.emissions.historicalEmissionsHeader,
        refundEmissionsHeader: r.texts.emissions.refundEmissionsHeader,
        dacGapEmissionsHeader: r.texts.emissions.dacGapEmissionsHeader,
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div className="radius bordered shadow card">
        <div className="card-divider">
          {this.state.header}
        </div>
        <div className="card-section">
          <h4 className="display-header">
            {this.state.annualEmissionsHeader}
          </h4>
          <p className="display-value">
            <NumberFormat 
            value={this.props.yearlyEmissions} 
            displayType={'text'} 
            thousandSeparator={true} 
            decimalScale={0} /> 
            {this.state.unit} CO<sub>2</sub>
          </p>
          <h4 className="display-header">
            {this.state.historicalEmissionsHeader}
          </h4>
          <p className="display-value">
            <NumberFormat 
            value={this.props.historicalEmissions} 
            displayType={'text'} 
            thousandSeparator={true} 
            decimalScale={0} /> 
            {this.state.unit} C0<sub>2</sub>
          </p>
          <h4 className="display-header">
            {this.state.refundEmissionsHeader}
          </h4>
          <p className="display-value">
            <NumberFormat 
            value={this.props.refundEmissions} 
            displayType={'text'} 
            thousandSeparator={true} 
            decimalScale={0} /> 
            {this.state.unit} CO<sub>2</sub>
          </p>
          <h4 className="display-header">
            {this.state.dacGapEmissionsHeader}
          </h4>
          <p className="display-value">
            <NumberFormat 
            value={ this.props.yearlyEmissions + this.props.historicalEmissions - this.props.refundEmissions } 
            displayType={'text'} 
            thousandSeparator={true} 
            decimalScale={0} />
            {this.state.unit} CO<sub>2</sub>
          </p>
        </div>
      </div>
    )
  }
}

CalculationEmissions.defaultProps = {
  yearlyEmissions: 0,
  historicalEmissions: 0,
  refundEmissions: 0,
  source: './data.json',
}