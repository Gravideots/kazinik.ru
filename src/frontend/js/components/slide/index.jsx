import React, { Component } from 'react';

import Image from '../image';
import Text from '../text';

export default class Slide extends Component {

  render() {
    return (
        <div className='Slide'>
            <Image src='https://www.w3.org/html/logo/downloads/HTML5_sticker.png' alt='html54'/>
            <Image src='assets/img/black.jpg' alt=''/>
            <Text type='mainWhite'>Михаил Казиник</Text>
            <Text type='footnoteWhite'>Михаил Казиник сноска</Text>
        </div>
    );
  }
}