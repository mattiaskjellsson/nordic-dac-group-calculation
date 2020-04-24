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
      height: 25px;
      background-color: #ccc;
      border-radius: 10px;
    `;

    const StyledThumb = styled.div`
      height: 25px;
      line-height: 25px;
      width: 25px;
      text-align: center;
      background-color: #3d86c6;
      color: #fff;
      border-radius: 50%;
      cursor: grab;
    `;

    const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;
    
    return (
      <StyledSlider
      min={this.props.min}
      max={this.props.max}
      step={this.props.step}
      defaultValue={this.props.defaultValue}
      value={this.state.value}
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
}
