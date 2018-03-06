import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { routeCodes } from 'config/routes';
import Slick from 'react-slick';

import Slide from '../slide';
import Icon from '../icon';
import Button from '../button';
import PartnerSlide from '../slide/partner';


export default class TagSlider extends Component {
  render() {
    const {
      tags,
      selected
    } = this.props;

    if( !tags ) return null;

    var settings = {
        dots: false,
        lazyLoad:true,
        infinite: false,
        draggable: false,
        autoplay: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: ( tags.length > 6)? <Button><Icon iconName='navigate_next' size='medium'/></Button>: null,
        prevArrow: ( tags.length > 6)? <Button><Icon iconName='navigate_before' size='medium'/></Button>: null,
        responsive: [
            {
              breakpoint: 763,
              settings: {
                slidesToShow: '2'
             }
            }
          ]
    };

    return (
      <Slick className='TagSlider' {...settings}>
        {tags.map((tag, key)=>{
          return(
            <div key={key}  onClick={()=>{this.props.click(tag.URL)}}>
              <div className={(selected === tag.URL)?'chip active': 'chip'}>{tag.Text}</div>
            </div>
          )
        })}
      </Slick>
    )
  }
}