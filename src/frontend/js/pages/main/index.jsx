import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {testAction, testAsync, getMainPage} from './actions.js';

import Button from 'components/button';
import Slider from 'components/slider';
import Footer from 'components/footer';
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

  navigationAfisha() {
    const {dispatch} = this.props;

    this.props.history.push('/afisha');
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
    let top;

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
            <Slider data={events} big={false} navigation='EVENT' internal={true} show='1' arrow={false}/>
          </div>
          <div className='col l4'>
            <Slider data={events} big={false} navigation='EVENT' internal={true} show='1' dots={true} arrow={false}/>
          </div>
          <div className='col l4'>
            <Slider data={school} big={false} navigation='SCHOOL' internal={true} show='1' dots={true} arrow={false}/>
          </div>
        </div>
      } else {
        firstBlock = <div className='row'>
          <div className='col l6'>
            <Slider data={events} big={true} navigation='EVENT' internal={true} show='1' dots={true} arrow={false}/>
          </div>
          <div className='col l6'>
            <Slider data={school} big={true} navigation='SCHOOL' internal={true} show='1' dots={true} arrow={false}/>
          </div>
        </div>
      }

      if (partners) {
        secondBlock = <div className='row'>
          <div className='col s12 partnerSlider'>
            <Slider
              data={partners}
              navigation='MAIN'
              internal={false}
              show={(partners.length > 10)? '10': partners.length}
              dots={false}
              arrow={true}
              responsive={[
                {
                  breakpoint: 763,
                  settings: {
                    slidesToShow: '2',
                    arrows: false,
                    dots: true
                 }
                }
              ]}
              />
          </div>
        </div>
      }

      top = <div className='topBlock'>
              <div className='topBlock__background'></div>
              <div className='topBlock__inner'>
                <div className='topBlock__tagline'>
                  <img src='assets/img/tagline.svg' alt=''/>
                </div>
                <div className='topBlock__afisha afishaTop'>
                  <a href="#/afisha/1" className="afishaTop__item" >24/01 | Таллинн</a>
                  <a href="#/afisha/1" className="afishaTop__item afishaTop__item--active" >24/01 | Санкт-Петербург</a>
                  <a href="#/afisha/1" className="afishaTop__item" >24/01 | Таллинн</a>
                  <a href="#/afisha/1" className="afishaTop__item" >24/01 | Таллинн</a>
                </div>
                <Button text='ПОЛНАЯ АФИША' onClick={() => this.navigationAfisha()} className='topBlock__button'/>
              </div>
            </div>;
    }

    return (
      <div className='MainPage'>
        {top}
        {firstBlock}
        {secondBlock}
        <Sections sections={sections}/>
        <Footer/>
      </div>
    );
  }
}