import Axios from 'axios';
import React, { Component } from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

export default class StyledSlider extends Component {
  constructor(props) {
    super(props);
    
    this.state = this.getDefaultState();
    this.setState({value: this.props.defaultValue });

    this.handleChange = this.handleChange.bind(this);
  }

  getDefaultState() {
    return {
      value: this.props.defaultProps,
      styling: {
        track: {
          width: "100%",
          height: '10px',
          background: '#eee',
          borderRadius: '5px',
        },
        thumb: {
          height: "30px",
          lineHeight: "28px",
          paddingLeft: "5px",
          paddingRight: "5px",
          textAlign: "center",
          backgroundColor: "#3d86c6",
          color: "#fff",
          borderRadius: "5px",
          border: "1px solid #333",
          cursor: "grab",
          position: "relative",
          top: "-10px",
        }
      }
    }
  }

  componentDidMount() {
    this.serverRequest = Axios.get(this.props.source)
    .then(res => {
      const r = res.data;
      this.setState({
        styling: {
          track: {
            width: r.styling.slider.track.width,
            height: r.styling.slider.track.height,
            background: r.styling.slider.track.background,
            borderRadius: r.styling.slider.track.borderRadius,
          },
          thumb: {
            height: r.styling.slider.thumb.height,
            lineHeight: r.styling.slider.thumb.lineHeight,
            paddingLeft: r.styling.slider.thumb.paddingLeft,
            paddingRight: r.styling.slider.thumb.paddingRight,
            textAlign: r.styling.slider.thumb.textAlign,
            backgroundColor: r.styling.slider.thumb.backgroundColor,
            color: r.styling.slider.thumb.color,
            borderRadius: r.styling.slider.thumb.borderRadius,
            border: r.styling.slider.thumb.border,
            cursor: r.styling.slider.thumb.cursor,
            position: r.styling.slider.thumb.position,
            top: r.styling.slider.thumb.top,
          }
        }
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }


  handleChange(e) {
    this.setState({value: e});
    this.props.onChange(e);
  }

  render() {

    const StyledSlider = styled(ReactSlider)`
      width: ${this.state.styling.track.width};
      height: ${this.state.styling.track.height};
      background-color: ${this.state.styling.track.background};
      border-radius: ${this.state.styling.track.borderRadius};
    `;

    const StyledThumb = styled.div`
      height: ${this.state.styling.thumb.height};
      line-height: ${this.state.styling.thumb.lineHeight};
      padding-left: ${this.state.styling.thumb.paddingLeft};
      padding-right: ${this.state.styling.thumb.paddingRight};
      text-align: ${this.state.styling.thumb.textAlign};
      background-color: ${this.state.styling.thumb.backgroundColor};
      color: ${this.state.styling.thumb.color};
      border-radius: ${this.state.styling.thumb.borderRadius};
      border: ${this.state.styling.thumb.border};
      cursor: ${this.state.styling.thumb.cursor};
      position: ${this.state.styling.thumb.position};
      top: ${this.state.styling.thumb.top};
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
  source: '../react/data.json'
}
