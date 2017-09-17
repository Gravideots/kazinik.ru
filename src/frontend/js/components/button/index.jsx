import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    this.props.onClick();
  }

  render() {
    const {
      children,
      text
    } = this.props;

    let content = <button className="btn waves-effect waves-light black ">{text}</button>;

    if(children)
      content = children;

    return (
      <div className='Button' onClick={this.click}>
          {content}
      </div>
    );
  }
}

//Usage
// <Button onClick={ this.handleTestButtonClick }>
//     <Icon iconName={"alarm"} size='medium'/>
//  </Button>
//or
//<Button onClick={ this.handleTestButtonClick } text='Button'/>