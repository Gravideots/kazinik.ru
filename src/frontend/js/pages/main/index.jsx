import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {testAction, testAsync, getMainPage} from './actions.js';

import Slider from 'components/slider';
import Sections from './sections';

@connect(state => ({
  asyncData: state
    .main
    .get('asyncData'),
  asyncError: state
    .main
    .get('asyncError'),
  asyncLoading: state
    .main
    .get('asyncLoading'),

  mainPageAsyncData: state
    .main
    .get('mainPageAsyncData'),
  mainPageAsyncError: state
    .main
    .get('mainPageAsyncError'),
  mainPageAsyncLoading: state
    .main
    .get('mainPageAsyncLoading'),

  counter: state
    .main
    .get('counter')
}))
export default class Main extends Component {
  static propTypes = {
    asyncData: PropTypes.string,
    asyncError: PropTypes.object,
    asyncLoading: PropTypes.bool,
    mainPageAsyncData: PropTypes.object,
    mainPageAsyncError: PropTypes.object,
    mainPageAsyncLoading: PropTypes.bool,
    counter: PropTypes.number, // from react-redux connect
    dispatch: PropTypes.func
  }

  constructor() {
    super();

    this.handleAsyncButtonClick = this
      .handleAsyncButtonClick
      .bind(this);
    this.handleTestButtonClick = this
      .handleTestButtonClick
      .bind(this);
  }

  componentWillMount() {
    const {dispatch} = this.props;

    dispatch(getMainPage());
  }

  handleAsyncButtonClick() {
    const {dispatch} = this.props;

    dispatch(testAsync());
  }

  handleTestButtonClick() {
    const {dispatch} = this.props;

    dispatch(testAction());
  }

  render() {
    const {
      asyncData,
      asyncError,
      asyncLoading,
      mainPageAsyncData,
      mainPageAsyncError,
      mainPageAsyncLoading,
      counter
    } = this.props;

    let special;
    let sections;
    let events;
    let school;
    let partners;

    //TODO вынести в отдельный файл
    let firstBlock;
    let secondBlock;
    let thirdBlock;

    if (mainPageAsyncData) {
      special = mainPageAsyncData.special;
      sections = mainPageAsyncData.sectionsBlock;
      events = mainPageAsyncData.slideShowEvents;
      school = mainPageAsyncData.slideShowSchool;
      partners = mainPageAsyncData.slideShowPartners;

      if (special && special.Active) {
        firstBlock = <div className='row'>
          <div className='col l4'>
            <Slider data={events} navigation='EVENT' internal={true} show='1'/>
          </div>
          <div className='col l4'>
            <Slider data={events} navigation='EVENT' internal={true} show='1' dots={true}/>
          </div>
          <div className='col l4'>
            <Slider data={school} navigation='SCHOOL' internal={true} show='1' dots={true}/>
          </div>
        </div>
      } else {
        firstBlock = <div className='row'>
          <div className='col l6'>
            <Slider data={events} navigation='MAIN' internal={true} show='1' dots={true}/>
          </div>
          <div className='col l6'>
            <Slider data={school} navigation='SCHOOL' internal={true} show='1' dots={true}/>
          </div>
        </div>
      }

      if (partners) {
        secondBlock = <div className='row'>
          <div className='col s12'>
            <Slider
              data={partners}
              navigation='MAIN'
              internal={false}
              show='7'
              arrow={true}/>
          </div>
        </div>
      }

    }

    return (
      <div className='MainPage'>
        {firstBlock}
        {secondBlock}
        <Sections sections={sections}/>
      </div>
    );
  }
}