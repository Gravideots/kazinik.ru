import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import {getNotePage} from './actions.js';

import Text from 'components/text';
import Image from 'components/image';
import Icon from 'components/icon';
import Button from 'components/button';
import TextSlider from 'components/textSlider';

@connect(state => ({
  notePageAsyncData: state
    .note
    .get('notePageAsyncData'),
  notePageAsyncError: state
    .note
    .get('notePageAsyncError'),
  notePageAsyncLoading: state
    .note
    .get('notePageAsyncLoading')
}))
export default class Note extends Component {
  static propTypes = {
    notePageAsyncData: PropTypes.object,
    notePageAsyncError: PropTypes.object,
    notePageAsyncLoading: PropTypes.bool,
    // from react-redux connect
    dispatch: PropTypes.func
  }

  componentWillMount() {
    const {dispatch, match} = this.props;

    dispatch(getNotePage(match.params.id));
  }

  render() {
    const {notePageAsyncData, notePageAsyncError, notePageAsyncLoading} = this.props;

    let titleImage = {
      full: 'url',
      crop: 'url'
    }
    let texts = [];
    let title = 'Title';
    let subTitle = 'subTitle';
    let description = 'description';
    let athor = 'athor';

    if (notePageAsyncData) {
      titleImage = notePageAsyncData.TitleImage;
      title = notePageAsyncData.Title;
      subTitle = notePageAsyncData.SubTitle;
      description = notePageAsyncData.Description;
      texts = notePageAsyncData.Note;
      athor = notePageAsyncData.Author;
    }

    return (
      <div className='Note'>
        <div className='imageCoverBlock'>
          <Image background={true} src={titleImage.Full}/>
        </div>
        <div className='container'>
            <Text type='header bold center'>
              «{title}»
            </Text>
            <Text type='subheader italic center hide-on-med-and-down'>
              {subTitle}
            </Text>
            <Text type='hide-on-med-and-down'>
              {description}
            </Text>
        </div>
        <div className='container noteBlock hide-on-med-and-down'>
          {texts.map((text, i) => {

            return  <div key={i} className='row'>
                      <Text type='subheader center'>{text.Title}</Text>
                      <Text>{text.Text}</Text>
                      {(text.Question !== null)? <Text type='bold question'>— {text.Question}</Text>: null}
                      {(text.Answer !== null)? <Text type='answer'>— {text.Answer}</Text>: null}
                      <div className='col s6 offset-s3'>
                        <Image background={false} src={text.Image}/>
                      </div>
                    </div>
                  })
          }
        </div>
        <div className='container hide-on-med-and-down'>
          <div className='row'>
            <Text type='right italic'>{athor}</Text>
          </div>
        </div>
      </div>
    );
  }
}