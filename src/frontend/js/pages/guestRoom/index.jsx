import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getGuestRoom, sendMessage} from './actions.js';

import QuestionCreator from './questionCreator';

import Text from 'components/text';
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
      modal: null,
      postId: null
    }

    //Modal
    this.openModal = this
      .openModal
      .bind(this);

    this.sendMessage = this
      .sendMessage
      .bind(this);
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
  }

  componentWillMount() {
    const {dispatch} = this.props;

    dispatch(getGuestRoom());
  }

  render() {
    var list = [{comments: [{imgUrl: true}, {imgUrl: false}, {imgUrl: false}, {imgUrl: false}]},{},{},{},{}];
    const {
      guestRoomAsyncData,
      guestRoomAsyncError,
      guestRoomAsyncLoading,
    } = this.props;

    if (guestRoomAsyncData){
      return (
        <div className='GuestRoom container'>
          <Text type='superHeader center'>{guestRoomAsyncData.Title}</Text>
          <Button text='Open Modal' onClick={this.openModal}>
            <p className="waves-effect waves-light btn black">Написать сообщение</p>
          </Button>
          <List listData={guestRoomAsyncData.Messages} type='Guest' action={this.openModal}/>
          <Modal
            headerText=''
            ref={e => this.state.modal = e}
          >
            <QuestionCreator action={this.sendMessage} sitekey={guestRoomAsyncData.CaptchaKey} postId={this.state.postId}/>
          </Modal>
        </div>
      );
    }
    else
      return null
  }
}