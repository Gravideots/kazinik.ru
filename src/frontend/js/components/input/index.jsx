import React, { Component } from 'react';

import Icon from '../icon';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.showRequired = this.showRequiredTooltip.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});

    const isValid = ( this.props.validate )? this.props.validate(event.target.value) : true;

    this.props.onChange(event.target.value, isValid);
  }

  reset(){
    this.setState({value: ''});
  }

  showRequiredTooltip(){
    let name = this.props.name;
    if(name){
      $('.' + name).tooltip().trigger("mouseenter");
      setTimeout(function(){$("."+ name).trigger("mouseleave");}, 3000);
    }
  }

  render() {
    const {
        type,
        name,
        placeholder,
        iconName,
        validate,
        tooltipPosition
    } = this.props;
    let inputName = name? name: '';
    let position = tooltipPosition? tooltipPosition: 'bottom';

    const icon = (iconName !== undefined)? <Icon iconName={iconName} size='tiny'/>: null;
    return (
      <div className='Input'>
        {icon}
        <input type={type} className={'input '+ inputName } data-position={position} data-tooltip='Обязательное поле' placeholder={placeholder} value={this.state.value} onChange={this.handleChange} required={validate? true : false}/>
      </div>
    );
  }
}

//Usage
// <Input placeholder='Input' type='text' iconName='search' onChange={this.handleChange}/>