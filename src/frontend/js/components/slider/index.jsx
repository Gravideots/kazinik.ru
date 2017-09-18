import React, { Component } from 'react';
import Slick from 'react-slick';

import Slide from '../slide';

export default class Slider extends Component {

  render() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <Slick {...settings}>
            <div>
                <Slide/>
            </div>
            <div>
                <Slide/>
            </div>
            <div>
                <Slide/>
            </div>
            <div>
                <Slide/>
            </div>
            <div>
                <Slide/>
            </div>
            <div>
                <Slide/>
            </div>
        </Slick>
    );
  }
}