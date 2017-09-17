import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from 'components/text';

export default class Logo extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    const {
      children,
      text
    } = this.props;

    let content = <Text>{text}</Text>;

    if(children)
      content = children;

    return (
      <div className='Logo'>
          {content}
      </div>
    );
  }
}

//Usage
// <Logo><Icon iconName={"alarm"} size='medium'/></Logo>
//or
// <Logo text='Михаил Казиник'/>