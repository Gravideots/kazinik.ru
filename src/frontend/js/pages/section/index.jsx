import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getSectionPage, tagSelected} from './actions.js';

import Text from 'components/text';
import TagCloud from 'components/tagCloud';
import List from 'components/list';
import Button from 'components/button';


@connect(state => ({
  sectionPageAsyncData: state
    .section
    .get('sectionPageAsyncData'),
  sectionPageAsyncError: state
    .section
    .get('sectionPageAsyncError'),
  sectionPageAsyncLoading: state
    .section
    .get('sectionPageAsyncLoading'),
  sectionPageSelectedTag: state
    .section
    .get('sectionPageSelectedTag'),
}))
export default class Section extends Component {
  static propTypes = {
    sectionPageAsyncData: PropTypes.object,
    sectionPageAsyncError: PropTypes.object,
    sectionPageAsyncLoading: PropTypes.bool,
    sectionPageSelectedTag: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor() {
    super();

    this.clickOnTag = this
      .clickOnTag
      .bind(this);
  }

  componentWillMount() {
    const {dispatch, match} = this.props;

    dispatch(getSectionPage(match.params.key));
  }

  clickOnTag(tag) {
    const {dispatch, match} = this.props;

    dispatch(tagSelected(match.params.key, tag));
  }

  render() {
    const {
      sectionPageAsyncData,
      sectionPageAsyncError,
      sectionPageAsyncLoading,
      sectionPageSelectedTag,
      match
    } = this.props;
    
    if (sectionPageAsyncData){
      return (
        <div className='Section'>
          <div className='container'>
            <Text type='superHeader bold center'>{sectionPageAsyncData.data[0].Title}</Text>
            <TagCloud tags={sectionPageAsyncData.data[0].Tags} click={this.clickOnTag} selected={sectionPageSelectedTag} />
            <Text type='main'>{sectionPageAsyncData.data[0].Description}</Text>
          </div>
          <div className={(match.params.key !== 'Event' && match.params.key !== 'School')? 'container': ''}>
            <List listData={sectionPageAsyncData.data[0].Listing} type={match.params.key}/>
          </div>
        </div>
      );
    }
    else
      return null
  }
}