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

    const StyledThumb = styled.div`
      height: 30px;
      line-height: 30px;
      width: 30px;
      text-align: center;
      background-color: #3d86c6;
      color: #fff;
      border-radius: 5%;
      cursor: grab;
      position: relative;
      top: -10px;
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
