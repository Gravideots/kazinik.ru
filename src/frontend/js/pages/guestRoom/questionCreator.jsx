import React, {Component} from 'react';
import Recaptcha from 'react-google-recaptcha';

import Text from 'components/text';
import List from 'components/list';
import Button from 'components/button';
import Input from 'components/input';
import TextArea from 'components/textArea';
import Modal from 'components/modal';

export default class QuestionCreator extends Component {

  constructor() {
    super();

    this.state = {
      recaptchaInstance: null,
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

  // handle reset
  resetRecaptcha(){
    //this.state.recaptchaInstance.reset();
    this.setState({
      captchaCheck: false
    })
    this.removeCaptchaGarbage();
  }

  inputNameHandler(val){
    this.setState({
      name: val
    })
  }

  inputMailHandler(val){
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

    this.props.action({
      mail: mail,
      name: name,
      message: message,
      postId: (this.props.postId)? this.props.postId : null
    });
    console.log('sendQuestion');
    this.resetRecaptcha();
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
      resetRecaptcha,
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
                <Input placeholder='Ваше имя' type='text' onChange={inputNameHandler}/>
              </div>
            </div>
            <div className='col s12'>
              <div className='col l3'>
                <Text>E-mail:</Text>
              </div>
              <div className='col l8'>
                <Input placeholder='Ваш E-mail' type='text' onChange={inputMailHandler}/>
              </div>
            </div>
          </div>
          <div className='col s6'>
            <Recaptcha
              ref={e => this.state.recaptchaInstance = e}
              sitekey={sitekey}
              onChange={verifyCallback}
              onExpired={expiredCallback}
            />
          </div>
          <div className='col s12'>
            <Button text='ОТПРАВИТЬ' onClick={sendQuestion}/>
          </div>
        </div>
        <div className='rigthPart col s6'>
          <TextArea className='col s12' onChange={inputMessageHandler}/>
        </div>
      </div>
    );
  }
}