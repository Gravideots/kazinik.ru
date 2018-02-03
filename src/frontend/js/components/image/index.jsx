import React, { Component } from 'react';

export default class Image extends Component {

  render() {
    const {
      src,
      alt,
      background
    } = this.props;
    //let backgroundUrl = 'url(' + src + ')';
    let backgroundUrl = 'url("assets/img/upload/1a2671d36ad7fdb1da560cf557bc28c4.png")';
    
    if(background)
      return (<div style={{ 'backgroundImage': backgroundUrl }} alt={alt} className='Image'/>);
    else
      return (<img src={src} alt={alt} className='Image responsive-img'/>);
  }
}

//Usage
//<Image src='https://js.devexpress.com/Content/Images/features/html5-css-javascript-logos.png' alt='html54'/>