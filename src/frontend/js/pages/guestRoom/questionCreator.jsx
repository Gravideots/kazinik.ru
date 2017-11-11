import React, {Component} from 'react';
import Recaptcha from 'react-google-recaptcha';

import Text from 'components/text';
import List from 'components/list';
import Button from 'components/button';
import Input from 'components/input';
import TextArea from 'components/textArea';
import Modal from 'components/modal';

import validator from 'email-validator';

export default class QuestionCreator extends Component {

  constructor() {
    super();

    this.state = {
      recaptchaInstance: null,
      nameInputInstance: null,
      mailInputInstance: null,
      textAreaInstance: null,
      captchaCheck: false,
      mail: null,
      name: null,
      message: null
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


  inputNameHandler(val, status){
    
    console.log('Name value', val);
    console.log('Name validation', status);

    this.setState({
      name: val
    })
  }

  inputMailHandler(val, status){
    console.log('Email value', val);
    console.log('Email validation', status);
    this.setState({
      mail: val
    })
  }

  inputMessageHandler(val){
    this.setState({
      message: val
    })
  }

  sendQuestion(){

    const {
      mail,
      name,
      message
    } = this.state;

    if(mail)
    this.props.action({
      mail: mail,
      name: name,
      message: message,
      postId: (this.props.postId)? this.props.postId : null
    });

    this.resetRecaptcha();
  }
  
  // handle reset
  resetRecaptcha(){

    const {
      recaptchaInstance,
      nameInputInstance,
      mailInputInstance,
      textAreaInstance,
    } = this.state;

    recaptchaInstance.reset();
    nameInputInstance.reset();
    mailInputInstance.reset();
    textAreaInstance.reset();

    this.setState({
      captchaCheck: false,
      name: '',
      mail: '',
      message: '',
      postId: null
    })
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

  render() {
    
    const {
      captchaCheck
    } = this.state;

    const {
      sitekey
    } = this.props;

    const {
      verifyCallback,
      expiredCallback,
      inputNameHandler,
      inputMailHandler,
      inputMessageHandler,
      sendQuestion
    } = this;

    return (
      <div className='QuestionCreator row'>
        <div className='leftPart col s6'>
          <div className='col s6'>
            <div className='col s12'>
              <div className='col l3'>
                <Text>ФИО:</Text>
              </div>
              <div className='col l8'>
                <Input ref={e => this.state.nameInputInstance = e} placeholder='Ваше имя' type='text' onChange={inputNameHandler}/>
              </div>
            </div>
            <div className='col s12'>
              <div className='col l3'>
                <Text>E-mail:</Text>
              </div>
              <div className='col l8'>
                <Input ref={e => this.state.mailInputInstance = e} placeholder='Ваш E-mail' type='text' onChange={inputMailHandler} validate={validator.validate}/>
              </div>
            </div>
          </div>
          <div className='col s6'>
            {
              sitekey?
              <Recaptcha
                ref={e => this.state.recaptchaInstance = e}
                sitekey={sitekey}
                onChange={verifyCallback}
                onExpired={expiredCallback}
              />
              :
              null
            }
          </div>
          <div className='col s12'>
            <Button text='ОТПРАВИТЬ' onClick={sendQuestion}/>
          </div>
        </div>
        <div className='rigthPart col s6'>
          <TextArea  ref={e => this.state.textAreaInstance = e} className='col s12' onChange={inputMessageHandler}/>
        </div>
      </div>
    );
  }
}