import React, { Component } from 'react';

import Icon from '../icon';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

  render() {
    const {
        type,
        placeholder,
        iconName
    } = this.props;
    const icon = (iconName !== undefined)? <Icon iconName={iconName} size='medium'/>: null;
    return (
      <div className='Input'>
        {icon}
        <input type={type} className='input' placeholder={placeholder} value={this.state.value} onChange={this.handleChange}/>
      </div>
    );
  }
}

//Usage
// <Input placeholder='Input' type='text' iconName='search' onChange={this.handleChange}/>