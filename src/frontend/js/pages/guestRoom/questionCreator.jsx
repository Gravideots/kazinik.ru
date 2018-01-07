import React, {Component} from 'react';

import Captcha from 'components/captcha';
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
      mailValid: false,
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
    this.resetStatements = this
      .resetStatements
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

    this.showRequiredField = this
      .showRequiredField
      .bind(this);
  }

  verifyCallback(response){
    console.log('NOT A ROBOT', response);
    this.setState({
      captchaCheck: true
    })
  }

  expiredCallback(){
    console.log('Captcha expired');
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
      mail: val,
      mailValid: status
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
      message,
      captchaCheck
    } = this.state;

    if(mail && name && message && captchaCheck){
      this.props.action({
        mail: mail,
        name: name,
        message: message,
        postId: (this.props.postId)? this.props.postId : null
      });

      this.resetStatements();
    }
    else{
      this.showRequiredField();
    }
  }
  
  showRequiredField(){
    const {
      nameInputInstance,
      mailInputInstance,
      recaptchaInstance,
      textAreaInstance
    } = this.state;

    //recaptchaInstance.showRequired();
    nameInputInstance.showRequiredTooltip();
    mailInputInstance.showRequiredTooltip();
    textAreaInstance.showRequiredTooltip();
  }

  // handle reset
  resetStatements(){

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

    if(!sitekey) return null;
    else
      return (
        <div className='QuestionCreator row'>
          <div className='Container col s12'>
            <div className={'left-align'}>
                <i className={'close small material-icons col s12 l12 m12'}>
                  close
                </i>
            </div>
            <div className='col s12'>
                <div className='col s12 l3'>
                  <Text>Ваше сообщение</Text>
                </div>
            </div>
            <div className='col s12'>
              <div className='col s12'>
                <div className='col s12 l3'>
                  <Text>ФИО:</Text>
                </div>
                <div className='col s12 l8'>
                  <Input ref={e => this.state.nameInputInstance = e} placeholder='Ваше имя' name='name' type='text' onChange={inputNameHandler}/>
                </div>
              </div>
              <div className='col s12'>
                <div className='col s12 l3'>
                  <Text>E-mail:</Text>
                </div>
                <div className='col s12 l8'>
                  <Input ref={e => this.state.mailInputInstance = e} placeholder='Ваш E-mail' type='text' name='mail' onChange={inputMailHandler} validate={validator.validate}/>
                </div>
              </div>
            </div>
            <div className='col s12'>
              <TextArea ref={e => this.state.textAreaInstance = e} name='contactForm__textarea' placeholder='Введите ваше сообщение' tooltipPosition='right' onChange={inputMessageHandler}/>
            </div>
            <div className='col s12 l6 captcha'>
              {
                sitekey?
                <Captcha
                  ref={e => this.state.recaptchaInstance = e}
                  siteKey={sitekey}
                  verifyCallback={verifyCallback}
                  expiredCallback={expiredCallback}
                />
                :
                null
              }
            </div>
            <div className='col s12'>
              <Button text='ОТПРАВИТЬ' className='modal-trigger Button--fw' onClick={sendQuestion}/>
            </div>
          </div>
        </div>
      );
  }
}