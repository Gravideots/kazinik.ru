import React, { Component } from 'react';

import Icon from '../icon';

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

  reset(){
    this.setState({value: ''});
  }

  render() {
    const {
        placeholder,
        className
    } = this.props;

    return (
      <div className={ className? 'TextArea ' + className:'TextArea'}>
        <textarea placeholder={placeholder} value={this.state.value} onChange={this.handleChange} rows={6}/>
      </div>
    );
  }
}