import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Recaptcha from 'react-google-recaptcha';

import {getGuestRoom} from './actions.js';

import Text from 'components/text';
import List from 'components/list';
import Button from 'components/button';
import Input from 'components/input';
import TextArea from 'components/textArea';


@connect(state => ({
  guestRoomAsyncData: state
    .guestRoom
    .get('guestRoomAsyncData'),
  guestRoomAsyncError: state
    .guestRoom
    .get('guestRoomAsyncError'),
  guestRoomAsyncLoading: state
    .guestRoom
    .get('guestRoomAsyncLoading'),

}))
export default class GuestRoom extends Component {
  static propTypes = {
    guestRoomAsyncData: PropTypes.object,
    guestRoomAsyncError: PropTypes.object,
    guestRoomAsyncLoading: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      recaptchaInstance: null,
      captchaCheck: false
    }
    // CAPTCHA
    this.verifyCallback = this
      .verifyCallback
      .bind(this);
    this.expiredCallback = this
      .expiredCallback
      .bind(this);
    this.resetRecaptcha = this
      .resetRecaptcha
      .bind(this);

    // Question
    this.inputNameHandler = this
      .inputNameHandler
      .bind(this);
    this.inputMailHandler = this
      .inputMailHandler
      .bind(this);
    this.inputMessageHandler = this
      .inputMessageHandler
      .bind(this);
    this.sendQuestion = this
      .sendQuestion
      .bind(this);
  }

  verifyCallback(response){
    console.log('NOT A ROBOT', response);
    this.setState({
      captchaCheck: true
    })
  }

  expiredCallback(){
    console.log('Recaptcha expired');
    this.setState({
      captchaCheck: false
    })
  }

  // handle reset
  resetRecaptcha(){
    //this.state.recaptchaInstance.reset();
    this.setState({
      captchaCheck: false
    })
    this.removeCaptchaGarbage();
  }

  inputNameHandler(val){
    console.log('inputNameHandler', val);
  }

  inputMailHandler(val){
    console.log('inputMailHandler', val);
  }

  inputMessageHandler(val){
    console.log('inputMessageHandler', val);
  }

  sendQuestion(){
    console.log('sendQuestion');
    this.resetRecaptcha();
  }

  componentWillMount() {
    const {dispatch} = this.props;

    dispatch(getGuestRoom());
  }

  componentWillUnmount() {
    this.removeCaptchaGarbage();
  }

  removeCaptchaGarbage(){
    var child = document.querySelector('.g-recaptcha-bubble-arrow').parentNode;
    var parent = document.querySelector('.g-recaptcha-bubble-arrow').parentNode.parentNode;
    parent.removeChild(child);
  }

  render() {
    const {
      guestRoomAsyncData,
      guestRoomAsyncError,
      guestRoomAsyncLoading,
    } = this.props;

    const {
      recaptchaInstance,
      captchaCheck
    } = this.state;

    const {
      verifyCallback,
      expiredCallback,
      resetRecaptcha,
      inputNameHandler,
      inputMailHandler,
      inputMessageHandler,
      sendQuestion
    } = this;

    if (guestRoomAsyncData){
      return (
        <div className='GuestRoom container'>
          <Text type='superHeader center'>Гостевая</Text>

          <div className='questionCreator'>
            <div className='topPart row'>
              <div className='col l6'>
                <div className='col l3'>
                  <Text>ФИО:</Text>
                </div>
                <div className='col l8'>
                  <Input placeholder='Ваше имя' type='text' onChange={inputNameHandler}/>
                </div>
              </div>
              <div className='col l6'>
                <div className='col l3'>
                  <Text>E-mail:</Text>
                </div>
                <div className='col l8'>
                  <Input placeholder='Ваш E-mail' type='text' onChange={inputMailHandler}/>
                </div>
              </div>
            </div>
            <div className='midlePart row'>
              <TextArea className='col s12' onChange={inputMessageHandler}/>
            </div>
            <div className='bottomPart row'>
              {(!captchaCheck ?
                <div className='col offset-s4 s3'>
                  <Recaptcha
                    ref={e => this.state.recaptchaInstance = e}
                    sitekey={guestRoomAsyncData.CaptchaKey}
                    onChange={verifyCallback}
                    onExpired={expiredCallback}
                  />
                </div>
                :
                <div className='col l12 center'>
                  <Button text='ОТПРАВИТЬ' onClick={sendQuestion}/>
                </div>
               )}
            </div>
          </div>
        </div>
      );
    }
    else
      return null
  }
}