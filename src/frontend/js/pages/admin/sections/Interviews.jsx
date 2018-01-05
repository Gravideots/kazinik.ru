import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

export default class Interviews extends Component {
  static propTypes = {
      contentToCreate: PropTypes.object,
      dispatch: PropTypes.func
  }

  constructor(props) {
      super(props);

      this.state = {
          preview: null,
          interview: []
      }
  }


  getPhoto( files ){
    this.setState({
        preview: files
    })
    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render() {
      const {contentToCreate} = this.props;

      return (
          <div className='AdminPage'>
              <h5>
                  Новая статья
              </h5>
              <form className='col s12'>
                  <div className='container'>
                    <div className='row add-content valign-wrapper'>
                        <div className="file-field input-field">
                            <input onChange={(e)=>this.getPhoto(e.target.files[0])} type="file"/>
                            <i className='small material-icons'>
                                    image
                            </i>
                            <p className='col s12  grey-text text-darken-3 center-align'>
                                Добавить основное изображение
                            </p>
                        </div>
                    </div>

                    <div className='input-field col s12'>
                        <input id='title' type='text' className='validate'/>
                        <label htmlFor='title'>
                            Заголовок для интервью
                        </label>
                    </div>

                    <div className='input-field col s12'>
                        <input id='title' type='text' className='validate'/>
                        <label htmlFor='title'>
                            Автор/источник (ссылка или текст)
                        </label>
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
            </form>
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