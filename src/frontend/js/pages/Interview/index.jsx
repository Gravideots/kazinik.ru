import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import {getInterviewPage} from './actions.js';

import Text from 'components/text';
import Image from 'components/image';
import Icon from 'components/icon';
import Button from 'components/button';
import TextSlider from 'components/textSlider';

@connect(state => ({
  interviewPageAsyncData: state
    .interview
    .get('interviewPageAsyncData'),
  interviewPageAsyncError: state
    .interview
    .get('interviewPageAsyncError'),
  interviewPageAsyncLoading: state
    .interview
    .get('interviewPageAsyncLoading')
}))
export default class Interview extends Component {
  static propTypes = {
    interviewPageAsyncData: PropTypes.object,
    interviewPageAsyncError: PropTypes.object,
    interviewPageAsyncLoading: PropTypes.bool,
    // from react-redux connect
    dispatch: PropTypes.func
  }

  componentWillMount() {
    const {dispatch, match} = this.props;

    dispatch(getInterviewPage(match.params.id));
  }

  render() {
    const {interviewPageAsyncData, interviewPageAsyncError, interviewPageAsyncLoading} = this.props;

    let titleImage = {
      full: 'url',
      crop: 'url'
    }
    let texts = [];
    let title = 'Title';
    let subTitle = 'subTitle';
    let description = 'description';
    let athor = 'athor';

    if (interviewPageAsyncData) {
      titleImage = interviewPageAsyncData.TitleImage;
      title = interviewPageAsyncData.Title;
      subTitle = interviewPageAsyncData.SubTitle;
      description = interviewPageAsyncData.Description;
      texts = interviewPageAsyncData.Note;
      athor = interviewPageAsyncData.Author;
    }

    return (
      <div className='Interview'>
        <div className='imageCoverBlock'>
          <Image background={true} src={titleImage.Full}/>
        </div>
        <div className='container'>
            <Text type='header bold center'>
              «{title}»
            </Text>
            <Text type='subheader italic center'>
              {subTitle}
            </Text>
            <Text type=''>
              {description}
            </Text>
        </div>
        <div className='container interviewBlock'>
          {texts.map((text, i) => {
            return  <div key={i} className='row'>
                      <Text type='subheader center'>{text.Title}</Text>
                      <Text>{text.Text}</Text>
                      <Text type='bold question'>— {text.Question}</Text>
                      <Text type='answer'>— {text.Answer}</Text>
                      <div className='col s6 offset-s3'>
                        <Image background={false} src={text.Image}/>
                      </div>
                    </div>
                  })
          }
        </div>
        <div className='container'>
          <div className='row'>
            <Text type='right italic'>{athor}</Text>
            <Text type='right italic'>Тут будет ссылка</Text>
          </div>
        </div>
      </div>
    );
  }
}