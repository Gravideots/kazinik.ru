import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createNote } from '../actions.js';

import Button from 'components/button';
import Text from 'components/text';
import Input from 'components/input';
import ImageInput from 'components/input/imageInput';

@connect()
export default class Note extends Component {
  static propTypes = {
      dispatch: PropTypes.func
  }

  constructor(props) {
      super(props);

      this.state = {
          preview: null,
          interview: {},
          article: { Note: [] },
          mainTitleInputInstance: null,
          authorInputInstance: null,
          descriptionInputInstance: null,
      }

      this.createNotesField = this.createNotesField.bind(this);
  }

  createNotesField( type ){

    var self = this;

    const { article } = this.state;

    switch( type ){
        case 'title': 
            article.Note.push( { Title: '' } );
            self.setState( { article: article } );    
            break;
        case 'text': 
            article.Note.push( { Text: '' } );
            self.setState( { article: article } );        
            break;
        case 'image': 
            article.Note.push( { Image: '' } );
            self.setState( { article: article } );
            break;
    }
  }

  render() {
      const { dispatch } = this.props;

      let { article, interview, mainTitleInputInstance, authorInputInstance, descriptionInputInstance  } = this.state;
      
      return (
          <div className='AdminPage Note'>
            <h5 className='center'>
              Новая статья
            </h5>
            <div className='row'>
                <div className='row add-content valign-wrapper'>
                    <ImageInput title='Заглавное изображение' onChange={ ( e ) => { article.TitleImage = e ; this.setState( { article: article } ) } }/>
                </div>
                <div className='input-field col s12'>
                    <Input ref={e => mainTitleInputInstance = e} placeholder='Заголовок' type='text' name={ article.Title ? 'header filed': 'header' } onChange={ ( e ) => { article.Title = e; this.setState( { article: article } ) } }/>
                </div>

                <div className='input-field col s12'>
                    <Input ref={e => authorInputInstance = e} placeholder='Автор' type='text' name={ article.Author ? 'author filed': 'author' } onChange={ ( e ) => { article.Author = e; this.setState( { article: article } ) } }/>
                </div>

                <div className='input-field col s12'>
                    <Input ref={e => descriptionInputInstance = e} placeholder='Описание' type='text' name={ article.Description ? 'description filed': 'description' } onChange={ ( e ) => { article.Description = e; this.setState( { article: article } ) } }/>
                </div>

                <p className='col s12 dash'/>
                
                {
                    article.Note && article.Note.map( ( elem, key ) => {
                        
                        if( elem.Title != void 0 )
                            return <CreatedContent key={ key } elem={ elem } type='Title' /> 
                        if( elem.Text != void 0 )
                            return <CreatedContent key={ key } elem={ elem } type='Text' /> 
                        if( elem.Image != void 0 )
                            return <CreatedContent key={ key } elem={ elem } type='Image' /> 
                    })
                }

                <div className='col s12'>
                    <InterviewsControll action={ this.createNotesField } />
                </div>
                
                <div className='SaveButtonContainer'>
                    <Button text='Сохранить' onClick={ () => dispatch( createNote(article) ) }/>
                </div>
            </div>
        </div>
        )
    }
}

class InterviewsControll extends Component {

    render(){

        const {
            action
        } = this.props;

        return(
            <div className='InterviewsControll'>
                <Button onClick={ () => action( 'title' ) } text='Добавить подзаголовок' icon="title"/>
                <Button onClick={ () => action( 'text' ) } text='Добавить текст' icon="text_fields"/>
                <Button onClick={ () => action( 'image' ) } text='Добавить изображение' icon="photo"/>
            </div>
        )
    }
}

class CreatedContent extends Component {

    constructor( props ){
        super( props )

        this.state = { field: null, text: '' }
    }

    render(){

        let { field, text } = this.state;
        const { elem, type } =  this.props;

        switch( type ){
            case 'Title': 
                return(
                    <div className='input-field col s12'>
                        <Input ref={e => field = e} placeholder='Заголовок' type='text' name={ text.length > 0 ? 'header filed': 'header' } onChange={ ( e ) => { this.setState( { text: e } ); elem.Title = e } }/>
                    </div>
                )
                break;
            case 'Text': 
                return(
                    <div className='input-field col s12'>
                        <Input ref={e => field = e} placeholder='Текст' type='text' name={ text.length > 0 ? 'description filed': 'description' } onChange={ ( e ) => { this.setState( { text: e } ); elem.Text = e } }/>
                    </div>
                )
            case 'Image':
                return(         
                    <div className='row add-content valign-wrapper'>
                        <ImageInput title='Изображение' onChange={ ( e ) => elem.Image = e }/>
                    </div>
                )
            default: return null;
        }
    }
}