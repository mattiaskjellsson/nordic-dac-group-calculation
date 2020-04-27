import React, { Component } from 'react';
import { Area, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
        
    this.generateData = this.generateData.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  generateData() {
    const start = new Date().getFullYear();
    
    // Calculate x0 for progressive calculations.
    var arr = []
    var rate = 1 + (this.props.progressiveIncrease/100.0);
    const years = this.props.removalYears;
    for(var n=1; n<=this.props.removalYears; n++) {
      arr.push(Math.pow(rate,years-n));
    }

    const sumX = arr.reduce((a, b) => a + b, 0);
    const x0 = this.props.emissionsToRemove/sumX;

    const data = (Array.from({length: this.props.removalYears}, (_, k) => start+k)).map((year, i) =>{

      var removingEmissionsThisYear = 0;
      if (this.props.removalPlan === 'sameAmount') {
        removingEmissionsThisYear = this.props.emissionsToRemove / (this.props.removalYears);
      } else {
        removingEmissionsThisYear = x0*Math.pow(rate, i);
      }

      
      const currentYearRefund = year === start ? this.props.annualRefund : this.props.annualRefund * ( 1.0 + (this.props.annualRefundIncrease / 100));
      const emissionsCurrentYear = this.props.annualEmissions - currentYearRefund;
      const yearNet = emissionsCurrentYear - removingEmissionsThisYear;

      return {
        name: year,
        "Removed emissions": -removingEmissionsThisYear.toFixed(2),
        "Emissions": emissionsCurrentYear.toFixed(2),
        "Net emissions": yearNet.toFixed(2),
      }
    })

    return data;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({data: this.generateData() });
    }
  }

  render() {
    return (
      <div className="chart-container">
        <ComposedChart
        width={600}
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
          <Area dataKey="Removed emissions" fill="#333" stroke="#999" />
          <Area dataKey="Emissions" barSize={30} fill="#3d86c6" />
          <Area type="monotone" dataKey="Net emissions" stroke="#47C251" />
        </ComposedChart>
      </div>
    )
  }
}

Chart.defaultState = {
  data: [],
};

Chart.defaultProps = {
  removalYears: 1,
  emissionsToRemove: 0,
  historicalEmissions: 0,
  annualEmissions: 0,
  annualRefund: 0,
  annualRefundIncrease: 0,
  removalPlan: 'sameAmount',
  progressiveIncrease: 0,
};
