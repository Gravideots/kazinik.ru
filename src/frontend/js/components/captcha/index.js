import React, { Component } from 'react';
import Recaptcha from 'react-google-recaptcha';

export default class Captcha extends Component {

  constructor() {
    super();

    this.state = {
      recaptchaInstance: null
    }

    this.reset = this
      .reset
      .bind(this);
  }

  reset(){
    this.state.recaptchaInstance.reset();
    
    this.removeCaptchaGarbage();
  }

  componentWillUnmount() {
    this.removeCaptchaGarbage();
  }

  removeCaptchaGarbage(){
    
    if(!document.querySelector('.g-recaptcha-bubble-arrow')) return;
    
    var child = document.querySelector('.g-recaptcha-bubble-arrow').parentNode;
    var parent = document.querySelector('.g-recaptcha-bubble-arrow').parentNode.parentNode;
    parent.removeChild(child);
  }

  render(){
    const{
      siteKey,
      verifyCallback,
      expiredCallback
    } = this.props;

    if(siteKey)
      return(
        <Recaptcha
          ref={e => this.state.recaptchaInstance = e}
          sitekey={siteKey}
          onChange={verifyCallback}
          onExpired={expiredCallback}
        />
      )
    else
      return null;
  }
}