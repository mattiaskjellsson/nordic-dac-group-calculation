import Axios from 'axios';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class FrontrunnerCosts extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

  }

  getInitialState() {
    return {
      header: "",
      unit: "",
      annualCost: "",
      optionMonthCost: "",
      administrationCost: "",
      totalCost: "",
    };
  }

  componentDidMount() {
    this.serverRequest = Axios.get(this.props.source)
    .then(res => {
      const r = res.data;
      this.setState({
        header: r.texts.costs.header,
        unit: r.texts.costs.unit,
        annualCost: r.texts.costs.annualCost,
        optionMonthCost: r.texts.costs.optionMonthCost,
        administrationCost: r.texts.costs.administrationCost,
        totalCost: r.texts.costs.totalCost
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
          <h4 className="display-header">{ this.state.annualCost}</h4>
          <p className="display-value">
            <NumberFormat value={this.props.annualCosts} 
              displayType={'text'} 
              thousandSeparator={true}
              decimalScale={0} 
              prefix={ this.state.unit} />
          </p>
          <h4 className="display-header">{this.state.optionMonthCost}</h4>
          <p className="display-value">
            <NumberFormat 
              value={this.props.optionMonthsCost} 
              displayType={'text'} 
              thousandSeparator={true} 
              decimalScale={0} 
              prefix={this.state.unit} />
          </p>
          <h4 className="display-header">{ this.state.administrationCost}</h4>
          <p className="display-value">
            <NumberFormat 
              value={this.props.administrationCost} 
              displayType={'text'} 
              thousandSeparator={true} 
              decimalScale={0} 
              prefix={this.state.unit} />
          </p>
          <h4 className="display-header">{this.state.totalCost}</h4>
          <p className="display-value">
            <NumberFormat 
              value={this.props.totalCost} 
              displayType={'text'} 
              thousandSeparator={true} 
              decimalScale={0} 
              prefix={this.state.unit} />
          </p>
        </div>
      </div>
    )
  }
}

FrontrunnerCosts.defaultProps = {
  annualCosts: 0,
  optionMonthsCost: 0,
  administrationCost: 0,
  totalCost: 0,
  source: './data.json',
};
