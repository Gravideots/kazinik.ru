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
    sectionPageSelectedTag: state
      .section
      .get('sectionPageSelectedTag'),
  }))
export default class Afisha extends Component {
  static propTypes = {
    sectionPageSelectedTag: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor() {
    super();

    this.tags = [
        {"Text": "Ближайшие", "URL": "latest"},
        {"Text": "Прошедшие", "URL": "past"}
    ];

    this.clickOnTag = this
      .clickOnTag
      .bind(this);
  }

  componentWillMount() {
    const {dispatch, match} = this.props;

 //   dispatch(getSectionPage(match.params.key));
  }

  clickOnTag(tag) {
    const {dispatch, match} = this.props;

    dispatch(tagSelected(match.params.key, tag));
  }

  render() {
    const {
        sectionPageSelectedTag,
        match
      } = this.props
    
      return (
        <div className='Afisha'>
          <div className='Afisha__head container'>
            <Text type='superHeader bold center'>Афиша</Text>
            <TagCloud tags={this.tags} click={this.clickOnTag} selected={sectionPageSelectedTag} />
            <div className='Afisha__years years'>
                <a href='#' className='years__item years__item--active'>2018</a>
                <a href='#' className='years__item'>2017</a>
                <a href='#' className='years__item'>2016</a>
                <a href='#' className='years__item'>2015</a>
                <a href='#' className='years__item'>2014</a>
                <a href='#' className='years__item'>2013</a>
            </div>
          </div>
          <div className={'Afisha__list container'}>
            <div className='Afisha__item'>
                <div className='Afisha__datetime'>
                    <p className='Afisha__date'>24 января 2018</p>
                    <p className='Afisha__time'>19:00</p>
                </div>
                <div className='Afisha__place'>
                    <p className='Afisha__city'>Таллин</p>
                    <p className='Afisha__name'>Концертный зал "Эстония" Концерт “Я обнимаю вас музыкой”</p>
                    <a className='Afisha__link' href="#">Подробнее >></a>
                </div>
            </div>
            <div className='Afisha__item'>
                <div className='Afisha__datetime'>
                    <p className='Afisha__date'>24 января 2018</p>
                    <p className='Afisha__time'>19:00</p>
                </div>
                <div className='Afisha__place'>
                    <p className='Afisha__city'>Таллин</p>
                    <p className='Afisha__name'>Концертный зал "Эстония" Концерт “Я обнимаю вас музыкой”</p>
                    <a className='Afisha__link' href="#">Подробнее >></a>
                </div>
            </div>
            <div className='Afisha__item'>
                <div className='Afisha__datetime'>
                    <p className='Afisha__date'>24 января 2018</p>
                    <p className='Afisha__time'>19:00</p>
                </div>
                <div className='Afisha__place'>
                    <p className='Afisha__city'>Таллин</p>
                    <p className='Afisha__name'>Концертный зал "Эстония" Концерт “Я обнимаю вас музыкой”</p>
                    <a className='Afisha__link' href="#">Подробнее >></a>
                </div>
            </div>
            <div className='Afisha__item'>
                <div className='Afisha__datetime'>
                    <p className='Afisha__date'>24 января 2018</p>
                    <p className='Afisha__time'>19:00</p>
                </div>
                <div className='Afisha__place'>
                    <p className='Afisha__city'>Таллин</p>
                    <p className='Afisha__name'>Концертный зал "Эстония" Концерт “Я обнимаю вас музыкой”</p>
                    <a className='Afisha__link' href="#">Подробнее >></a>
                </div>
            </div>
          </div>
        </div>
      );
  }
}