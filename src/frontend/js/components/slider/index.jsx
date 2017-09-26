import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { routeCodes } from 'config/routes';
import Slick from 'react-slick';

import Slide from '../slide';
import Icon from '../icon';
import Button from '../button';
import PartnerSlide from '../slide/partner';

export default class Slider extends Component {

  render() {
    const {
        data,
        navigation,
        internal,
        show,
        dots,
        arrow
    } = this.props;

    var settings = {
        dots: (dots && data.length > show),
        lazyLoad:true,
        infinite: false,
        draggable: false,
        autoplay: false,
        speed: 500,
        slidesToShow: show,
        slidesToScroll: 1,
        nextArrow: (arrow && data.length > show)? <Button><Icon iconName='navigate_next' size='medium'/></Button>: null,
        prevArrow: (arrow && data.length > show)? <Button><Icon iconName='navigate_before' size='medium'/></Button>: null 
    };

    return (
        <Slick className='Slider' {...settings}>
            {
                data.map( (slideInfo, key) => {
                    if(internal)
                        return   <div key={key}>
                                        <Link to={{
                                            pathname: routeCodes[navigation],
                                            search: slideInfo.URL,
                                        }}>
                                            <Slide data={slideInfo}/>
                                        </Link>
                                    </div>
                    else
                        return   <div key={key}><PartnerSlide data={slideInfo}/></div>
                })
            }
        </Slick>
    );
  }
}