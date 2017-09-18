import React, { Component } from 'react';

export default class Image extends Component {

  render() {
    const {
      src,
      alt
    } = this.props;

    return (
      <img src={src} alt={alt} className='Image'/>
    );
  }
}

//Usage
//<Image src='https://js.devexpress.com/Content/Images/features/html5-css-javascript-logos.png' alt='html54'/>