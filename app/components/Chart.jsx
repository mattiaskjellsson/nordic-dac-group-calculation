import Axios from 'axios';
import React, { Component } from 'react';
import { Area, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
        
    this.graphData = this.graphData.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  getInitialState() {
    return {
      data: [],
      colors: {
        grid: "",
        removedFill: "",
        removedStroke: "",
        emissionsFill: "",
        emissionsStroke: "",
        netEmissionsFill: "",
        netEmissionsStroke: ""
      }
    };
  }

  componentDidMount() {
    this.serverRequest = Axios.get(this.props.source)
    .then(res => {
      const r = res.data;
      this.setState({
          removed: r.texts.chart.removed,
          emissions: r.texts.chart.emissions,
          net: r.texts.chart.net,
          colors: {
            grid: r.styling.chart.grid,
            removedFill: r.styling.chart.removedFill,
            removedStroke: r.styling.chart.removedStroke,
            emissionsFill: r.styling.chart.emissionsFill,
            emissionsStroke: r.styling.chart.emissionsStroke,
            netEmissionsFill: r.styling.chart.netEmissionsFill,
            netEmissionsStroke: r.styling.chart.netEmissionsStroke
          }
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  graphData() {
    const start = new Date().getFullYear();
    
    // Calculate x0 (first 'payment') for progressive calculations.
    const rate = 1 + (this.props.progressiveIncrease/100.0);
    const coefficients = n => [...Array(n)].map((_, index) => Math.pow(rate, n-(index+1)));
    const x0 = this.props.emissionsToRemove/(coefficients(this.props.removalYears).reduce((a, b) => a + b, 0));

    const data = (Array.from({length: this.props.removalYears}, (_, k) => start+k)).map((year, i) => {

      var removingEmissionsThisYear = 0;
      if (this.props.removalPlan === 'sameAmount') {
        removingEmissionsThisYear = this.props.emissionsToRemove / (this.props.removalYears);
      } else {
        removingEmissionsThisYear = x0 * Math.pow(rate, i);
      }

      
      const currentYearRefund = year === start ? this.props.annualRefund : this.props.annualRefund * ( 1.0 + (this.props.annualRefundIncrease / 100));
      const emissionsCurrentYear = this.props.annualEmissions - currentYearRefund;
      const yearNet = emissionsCurrentYear - removingEmissionsThisYear;

      var retObject = {};
      retObject[this.state.removed] = -removingEmissionsThisYear.toFixed(2);
      retObject[this.state.emissions] = emissionsCurrentYear.toFixed(2);
      retObject[this.state.net] =  yearNet.toFixed(2);
      return retObject;
    })

    return data;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({data: this.graphData() });
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
          <CartesianGrid stroke={this.state.colors.grid} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area dataKey={ this.state.removed} fill={this.state.colors.removedFill} stroke={this.state.colors.removedStroke} />
          <Area dataKey={ this.state.emissions} barSize={30} fill={this.state.colors.emissionsFill} stroke={this.state.colors.emissionsStroke} />
          <Area type="monotone" dataKey={this.state.net} fill={this.state.colors.netEmissionsFill} stroke={this.state.colors.netEmissionsStroke} />
        </ComposedChart>
      </div>
    );
  }
}

Chart.defaultState = {
  data: [],
  colors: {
    grid: "",
    removedFill: "",
    removedStroke: "",
    emissionsFill: "",
    emissionsStroke: "",
    netEmissionsFill: "",
    netEmissionsStroke: ""
  }
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
  source: './data.json'
};
