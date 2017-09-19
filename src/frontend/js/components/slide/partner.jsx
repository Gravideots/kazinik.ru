import React, { Component } from 'react';

import Image from '../image';

export default class PartnerSlide extends Component {

  render() {
    const {
        data
    } = this.props;

    return (
        <div className='PartnerSlide valign-wrapper'>
            <a href={data.URL} target='_blank'>
                <Image src={data.BackgroundImage} alt={data.Title}/>
            </a>
        </div>
    );
  }
}