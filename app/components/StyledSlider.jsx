import React, { Component } from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

export default class StyledSlider extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: this.props.defaultProps,
    }
    
    this.setState({value: this.props.defaultValue });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e});
    this.props.onChange(e);
  }

  render() {
    const StyledSlider = styled(ReactSlider)`
      width: 100%;
      height: 10px;
      background-color: #eee;
      border-radius: 10px;
    `;

    var width = 45;
    const inc = 7;
    const val = this.state.value;
    if (val > 9999) {
      width += 4*inc;
    } else if (val > 999) { 
      width += 3*inc; 
    } else if (val > 99) {
      width += 2*inc;
    } else if (val > 9) {
      width += inc;
    }

    width += this.props.unit.lenth * inc;
    
    const StyledThumb = styled.div`
      height: 30px;
      line-height: 28px;
      width: ${width}px;
      text-align: center;
      background-color: #3d86c6;
      color: #fff;
      border-radius: 5px;
      border: 1px solid #333;
      cursor: grab;
      position: relative;
      top: -10px;
    `;
    
  const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow + ' ' + this.props.unit }</StyledThumb>;
    
    return (
      <StyledSlider
      min={this.props.min}
      max={this.props.max}
      step={this.props.step}
      defaultValue={this.props.defaultValue}
      value={this.state.value}
      unit={this.props.unit}
      renderThumb={Thumb}
      onAfterChange={ this.handleChange }
    />
    )
  }
}

StyledSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50,
  unit: '',
}
