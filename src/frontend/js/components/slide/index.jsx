import React, { Component } from 'react';

import Image from '../image';
import Text from '../text';

export default class Slide extends Component {

  render() {
    const {
        data
    } = this.props;

    return (
        <div className='Slide'>
            <Image src={data.BackgroundImage} alt={data.Title}/>
            <Image src='assets/img/black.jpg' alt=''/>
            <Text type='mainWhite'>{data.Title}</Text>
            <Text type='footnoteWhite'>{data.SubTitle}</Text>
        </div>
    );
  }
}