import React, { Component } from 'react';

import Icon from '../icon';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});

    const isValid = ( this.props.validate )? this.props.validate(event.target.value) : true;

    this.props.onChange(event.target.value, isValid);
  }

  reset(){
    this.setState({value: ''});
  }

  render() {
    const {
        type,
        placeholder,
        iconName,
        validate
    } = this.props;
    const icon = (iconName !== undefined)? <Icon iconName={iconName} size='tiny'/>: null;
    return (
      <div className='Input'>
        {icon}
        <input type={type} className='input' placeholder={placeholder} value={this.state.value} onChange={this.handleChange} required={validate? true : false}/>
      </div>
    );
  }
}

//Usage
// <Input placeholder='Input' type='text' iconName='search' onChange={this.handleChange}/>