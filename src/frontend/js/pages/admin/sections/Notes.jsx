import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';
import Text from 'components/text';
import Input from 'components/input';
import ImageInput from 'components/input/imageInput';

export default class Note extends Component {
  static propTypes = {
      contentToCreate: PropTypes.object,
      dispatch: PropTypes.func
  }

  constructor(props) {
      super(props);

      this.state = {
          preview: null,
          interview: {},
          article: {},
          mainTitleInputInstance: null,
          authorInputInstance: null
      }
  }

  render() {
      const {contentToCreate} = this.props;

      let { article, interview, mainTitleInputInstance, authorInputInstance  } = this.state;

      return (
          <div className='AdminPage Note'>
            <h5>
              Новая статья
            </h5>
            <div className='row'>
                <div className='row add-content valign-wrapper'>
                    <ImageInput onChange={ ( e ) => console.log(e) }/>
                </div>
                <div className='input-field col s12'>
                    <Input ref={e => mainTitleInputInstance = e} placeholder='Заголовок' type='text' name={ article.Title ? 'header filed': 'header' } onChange={ ( e ) => { article.Title = e; this.setState( { article: article } ) } }/>
                </div>

                <div className='input-field col s12'>
                    <Input ref={e => authorInputInstance = e} placeholder='Автор' type='text' name={ article.Author ? 'author filed': 'author' } onChange={ ( e ) => { article.Author = e; this.setState( { article: article } ) } }/>
                </div>

                <div className='input-field col s12'>
                    <input id='subTitle' type='text' className='validate'/>
                    <label htmlFor='subTitle'>
                        Подзаголовок
                    </label>
                </div>

                <div className='input-field col s12'>
                    <textarea id='description' className='materialize-textarea'></textarea>
                    <label htmlFor='description'>
                        Описание
                    </label>
                </div>
                <div className='col s12'>
                    <Button text='Начать интервью'/>
                </div>
                <div className='col s12'>
                    <InterviewsControll />
                </div>
            </div>
        </div>
        )
    }
}

class InterviewsControll extends Component {

    render(){
        
        return(
            <div className='InterviewsControll'>
                <Button>
                    <Text>
                        Заголовок
                    </Text>
                </Button>
                <Button>
                    <Text>
                        Вопрос
                    </Text>
                </Button>
                <Button>
                    <Text>
                        Ответ
                    </Text>
                </Button>
            </div>
        )
    }
}