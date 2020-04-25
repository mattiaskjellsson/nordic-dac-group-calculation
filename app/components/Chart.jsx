import React, { Component } from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
    
    this.props = {
      removalYears: 0,
      emissionsToRemove: 0,
      historicalEmissions: 0,
      annualEmissions: 0,
      annualRefund: 0,
      annualRefundIncrease: 0,
    }
    
    this.generateData = this.generateData.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  generateData() {
    const start = new Date().getFullYear();
    const end = start + this.props.removalYears;

    const removingEmissionsPerYear = this.props.emissionsToRemove / this.props.removalYears;

    const data = [];
    
    for(var year = start, i = 0; year <= end; year++, i++) {
      const emissionsThisYear = this.props.annualEmissions - this.props.annualRefund * ( 1 + this.props.annualRefundIncrease/100.0) * i;
      const yearNet = emissionsThisYear - removingEmissionsPerYear;
      const item = {
        name: year,
        yearNet: yearNet,
        removingEmissionsPerYear: -removingEmissionsPerYear,
        emissionsThisYear: emissionsThisYear,
      };

      data.push(item);
    }

    return data;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({data: this.generateData() });
    }
  }

  render() {
    return (
      <div>
        <ComposedChart
        width={500}
        height={400}
        data={ this.state.data }
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="removingEmissionsPerYear" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="emissionsThisYear" barSize={30} fill="#413ea0" />
          <Line type="monotone" dataKey="yearNet" stroke="#ff7300" />
        </ComposedChart>
      </div>
    )
  }
}

Chart.defaultState = {
  data: [],
};

Chart.defaultProps = {
  removalYears: 0,
  emissionsToRemove: 0,
  historicalEmissions: 0,
  annualEmissions: 0,
  annualRefund: 0,
  annualRefundIncrease: 0,
};
