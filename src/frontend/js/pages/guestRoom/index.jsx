import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getGuestRoom, sendMessage, resizeQuestionButton} from './actions.js';

import QuestionCreator from './questionCreator';

import Text from 'components/text';
import Icon from 'components/icon';
import List from 'components/list';
import Button from 'components/button';
import Modal from 'components/modal';

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
  questionButtonState: state
    .guestRoom
    .get('questionButtonState')
}))
export default class GuestRoom extends Component {
  static propTypes = {
    guestRoomAsyncData: PropTypes.object,
    guestRoomAsyncError: PropTypes.object,
    guestRoomAsyncLoading: PropTypes.bool,
    questionButtonState: PropTypes.bool,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      modal: null,
      postId: null,
      sticky: false,
    }

    //Modal
    this.openModal = this
      .openModal
      .bind(this);

    this.sendMessage = this
      .sendMessage
      .bind(this);

    this.resetSendForm = this
      .resetSendForm
      .bind(this);

    this.handleScroll = this
      .handleScroll
      .bind(this);
  }

  
  componentWillMount() {
    const {dispatch} = this.props;

    dispatch(getGuestRoom());
  }
  
  componentDidMount(){
    var self = this;
    document.addEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    if(scrollY >= 200)
      {
        if(!this.props.questionButtonState)
          this.props.dispatch(resizeQuestionButton(!this.props.questionButtonState))
        // this.state.sticky = !this.state.sticky;
        // this.setState({
        //   sticky: true
        // })
      }
    else
      {
        if(this.props.questionButtonState)
          this.props.dispatch(resizeQuestionButton(!this.props.questionButtonState))
        // this.setState({
        //   sticky: false
        // })
        
        // this.state.sticky = !this.state.sticky;
      }
    
  }

  openModal(e, id){
    const {
      modal
    } = this.state;

    if(modal){
      modal.open();
    }

    if(id)
      this.setState({
        postId: id
      });
  }

  sendMessage(messageData){
    const {dispatch} = this.props;
    dispatch(sendMessage(messageData));

    this.resetSendForm();
  }

  resetSendForm(){

    const {
      modal
    } = this.state;

    if(modal){
      modal.close();
    }
  }

  render() {
    const {
      guestRoomAsyncData,
      guestRoomAsyncError,
      guestRoomAsyncLoading,
      questionButtonState
    } = this.props;

    if (guestRoomAsyncData){
      return (
        <div className='GuestRoom container'>
          <Text type='superHeader center'>{guestRoomAsyncData.Title}</Text>
          <div className='row'>
            <div className='col s6'>
              <Text type='helptext center bold'>Задано вопросов: <span>{guestRoomAsyncData.Messages.length}</span></Text>
            </div>
            <div className='col s6'>
              <Text type='helptext center bold'>Ответов: <span>{guestRoomAsyncData.Messages.length}</span></Text>
            </div>
          </div>
          <div className={(questionButtonState)?'ButtonContainer sticky':'ButtonContainer'}>
            <Button text='Open Modal' onClick={this.openModal}>
              <div className="bigBlackBtn">                
                <p className="waves-effect waves-light btn black"><Icon iconName="help_outline"/>задать вопрос</p>
              </div>
            </Button>
          </div>
          <List listData={guestRoomAsyncData.Messages} type='Guest' action={this.openModal}/>
          <Modal
            headerText=''
            ref={e => this.state.modal = e}
          >
            <QuestionCreator action={this.sendMessage} sitekey={guestRoomAsyncData.CaptchaKey} postId={this.state.postId} reset={this.state.reset}/>
          </Modal>
        </div>
      );
    }
    else
      return null
  }
}