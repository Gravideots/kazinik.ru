import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'email-validator';

import {getAuthenticate} from './actions.js';

import Text from 'components/text';
import Input from 'components/input';
import List from 'components/list';
import Button from 'components/button';


@connect(state => ({
    authData: state
      .login
      .get('authData'),
    message: state
      .login
      .get('message'),
    isAuthenticate: state
      .login
      .get('isAuthenticate'),
}))
export default class Login extends Component {
  static propTypes = {
    authData: PropTypes.object,
    message: PropTypes.string,
    isAuthenticate: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      emailInputInstance: null,
      passwordInstance: null,
      email: null,
      emailValid: false,
      password: null
    }

    this.authenticate = this
      .authenticate
      .bind(this);

    this.inputEmailHandler = this
      .inputEmailHandler
      .bind(this);

    this.inputPasswordHandler = this
      .inputPasswordHandler
      .bind(this);
  }

  authenticate() {
    const { dispatch } = this.props;

    const {
      email,
      emailValid,
      emailInputInstance,
      password,
      passwordInstance,
    } = this.state;

    if(emailValid && password.length > 0)
      dispatch(getAuthenticate({email, password}));
    else{
      emailInputInstance.showRequiredTooltip();
      passwordInstance.showRequiredTooltip();
    }
    console.log(email, password);
  }

  inputEmailHandler(val, status) {
    this.setState({
      email: val,
      emailValid: status
    })
  }

  inputPasswordHandler(val) {
    this.setState({
      password: val
    })
  }

  render() {
    const {
      authData,
      isAuthenticate,
      message,
      location
    } = this.props;
    console.log(authData);
    if(!isAuthenticate)
      return (
        <div className="row">
          <div className="col s4 offset-s4">
            <div className="col s12">
              <Input ref={e => this.state.emailInputInstance = e} tooltipPosition='right' name="mail" placeholder='Ваш E-mail' type='text' iconName='perm_identity' onChange={this.inputEmailHandler} validate={validator.validate}/>
            </div>
            <div className="col s12">
              <Input ref={e => this.state.passwordInstance = e} tooltipPosition='right' name="password" placeholder='Password' type='password' iconName='security' onChange={this.inputPasswordHandler}/>
            </div>
            <div className="center-align" >
              <Button text="войти" onClick={this.authenticate}/>
            </div>
            {message != null?
              <div className="center-align" >
                <Text>
                  {message}
                </Text>
              </div>
              :
              null
            }
          </div>
        </div>
      );
    else {
      localStorage.setItem('userName', authData.user);
      localStorage.setItem('userMail', authData.email);
      localStorage.setItem('userToken', authData.token);

      return(
        <Redirect to={{
          pathname: '/admin',
          state: { from: location, token: authData.token }
        }}/>
      )
    }
  }
}