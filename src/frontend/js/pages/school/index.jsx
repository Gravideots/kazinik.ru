import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import {getSchoolPage} from './actions.js';

import Text from 'components/text';
import Image from 'components/image';
import Icon from 'components/icon';
import Button from 'components/button';
import TextSlider from 'components/textSlider';

@connect(state => ({
  schoolPageAsyncData: state
    .school
    .get('schoolPageAsyncData'),
  schoolPageAsyncError: state
    .school
    .get('schoolPageAsyncError'),
  schoolPageAsyncLoading: state
    .school
    .get('schoolPageAsyncLoading')
}))
export default class School extends Component {
  static propTypes = {
    schoolPageAsyncData: PropTypes.object,
    schoolPageAsyncError: PropTypes.object,
    schoolPageAsyncLoading: PropTypes.bool,
    // from react-redux connect
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.goTo = this
      .goTo
      .bind(this);
    this.openDropDown = this
      .openDropDown
      .bind(this);
  }
  componentWillMount() {
    const {dispatch, match} = this.props;

    dispatch(getSchoolPage(match.params.id));
  }
  componentDidMount() {
    $('.modal').modal();
    $('.collapsible').collapsible();
  }
  goTo(url) {
    window.open(url)
  }
  openDropDown() {
    $('#modal1').modal('open');
  }
  render() {
    const {schoolPageAsyncData, schoolPageAsyncError, schoolPageAsyncLoading} = this.props;

    let titleImage = {
      full: 'url',
      crop: 'url'
    }
    let texts = [];
    let title = 'Title';
    let subTitle = 'subTitle';
    let buttons = [];
    let schoolDateStart = new Date();
    let schoolDateEnd = new Date();
    let address = "Место проведения";
    let price = "100";

    if (schoolPageAsyncData) {
      titleImage = schoolPageAsyncData.TitleImage;
      title = schoolPageAsyncData.Title;
      texts = schoolPageAsyncData.Text;
      subTitle = schoolPageAsyncData.SubTitle;
      buttons = schoolPageAsyncData.Button;
      schoolDateStart = schoolPageAsyncData.EventDate.Start;
      schoolDateEnd = schoolPageAsyncData.EventDate.Finish;
      address = schoolPageAsyncData.Address;
      price = schoolPageAsyncData.Price;
    }
    var date = {
      year: 'short',
      month: 'short',
      day: 'short'
    };
    var time = {
      hour: 'numeric',
      minute: 'numeric'
    };

    return (
      <div className='SchoolPage'>
        <div className='imageCoverBlock'>
          <Image background={true} src={titleImage.Full}/>
          <Image src='assets/img/black.jpg' alt=''/>
          <div className='valign-wrapper'>
            <Text type='header bold whiteText'>
              «{title}»
            </Text>
            <Text type='footnote'>
              {subTitle}
            </Text>
          </div>
        </div>
        <div className='row'>
          <div className='col l12'>
            <div className='col l3'>
              <Text type='SchoolPage__helptext bolder'>Даты проведения</Text>
              <Text>С {schoolDateStart.toLocaleDateString("ru-RU")} по {schoolDateEnd.toLocaleDateString("ru-RU")}</Text>
            </div>
            <div className='col l3'>
              <Text type='SchoolPage__helptext bolder'>Место проведения</Text>
              <Text>{address}</Text>
            </div>
            <div className='col l3'>
              <Text type='SchoolPage__helptext bolder'>Стоимость</Text>
              <Text>{price}</Text>
            </div>
            <div className='col s12 m12 l3'>
              <Button
                onClick={() => {
                  this.openDropDown()
                }}
                text='Оставить заявку'
                data='modal1'
                className='modal-trigger Button--fw'/>
            </div>
          </div>
        </div>
        <div className='row'>
          {
            texts.map((text, i) => {
              return  <div key={i} className='col s12'>
                        <Text type='subheader'>{text.Title}</Text>
                        <Text type='main'>{text.Info}</Text>
                      </div>
            })
          }
        </div>
      </div>
    );
  }
}