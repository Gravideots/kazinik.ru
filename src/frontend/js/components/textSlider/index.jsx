import React, { Component } from 'react';
import Slick from 'react-slick';

import Text from 'components/text';
import Button from 'components/button';
import Icon from 'components/icon';

export default class TextSlider extends Component {

    render() {
        const {
            texts
        } = this.props;

        var settings = {
            dots: (texts.length > 1),
            lazyLoad: false,
            infinite: true,
            draggable: false,
            autoplay: false,
            speed: 500,
            slidesToScroll: 1,
            nextArrow: (texts.length > 1)?<Button><Icon iconName='navigate_next' size='medium'/></Button>:null,
            prevArrow: (texts.length > 1)?<Button><Icon iconName='navigate_before' size='medium'/></Button>:null
        };

        if(texts.length > 0)
            return (
                <Slick {...settings} className='TextSlider'>
                    {texts.map((text, i)=>{
                        return  <div key={i}>
                                    <Text type='subheader bold'>{text.Title}</Text>
                                    <Text>{text.Info}</Text>
                                </div>
                    })}   
                </Slick>   
            );
        else    
            return null;
    }
}