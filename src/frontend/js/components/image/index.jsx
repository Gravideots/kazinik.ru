import React, { Component } from 'react';

export default class Image extends Component {

  render() {
    const {
      src,
      alt,
      background
    } = this.props;
    if(background)
      return (<div style={{'backgroundImage': 'url(' + src + ')'}} alt={alt} className='Image'/>);
    else
      return (<img src={src} alt={alt} className='Image responsive-img'/>);
  }
}

//Usage
//<Image src='https://js.devexpress.com/Content/Images/features/html5-css-javascript-logos.png' alt='html54'/>