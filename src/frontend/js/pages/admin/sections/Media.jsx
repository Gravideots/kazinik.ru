import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CreateMedia extends Component {
  
      static propTypes = {
          sectionID: PropTypes.string,
          dispatch: PropTypes.func
      }
      constructor(props) {
          super(props)
  
          this.state = {
              URL: '',
              tags: '',
              sectionID: this.props.sectionID
          }
      }
  
      handleChange(event) {
          switch (event.target.id) {
              case 'URL':
                  this.setState({URL: event.target.value});
                  break;
              case 'tags':
                  this.setState({tags: event.target.value});
                  break;
              default:
                  break;
          }
      }
  
      handleSubmit(event) {
          event.preventDefault();
          const {dispatch} = this.props;
          dispatch(addMedia(this.state));
      }
  
      render() {
          let media
  
          if (this.state.URL != '') 
              media = <MediaListElement data={this.state}/>
  
          return (
              <div className='AdminPage'>
                  <h5>Добавить медиа</h5>
                  <div className='container'>
                      <form className='col s12' onSubmit={(e) => this.handleSubmit(e)}>
                          <div className='input-field col s12'>
                              <input
                                  id='URL'
                                  type='text'
                                  className='validate'
                                  value={this.state.URL}
                                  onChange=
                                  { (e) => { this.handleChange(e)}}/>
                              <label htmlFor='title'>
                                  Ссылка на источник(YouTube / SoundCloud /Vimeo)
                              </label>
                          </div>
                          {media}
                          <div className='input-field col s12'>
                              <input
                                  id='tags'
                                  type='text'
                                  className='validate'
                                  value={this.state.tags}
                                  onChange=
                                  {(e) => {this.handleChange(e)}}/>
                              <label htmlFor='title'>
                                  Теги (через запятую, например: видео, выступление, конференция)
                              </label>
                          </div>
                          <div className='col s12'>
                              <button className='btn waves-effect waves-light' type='submit' name='action'>
                                  Сохранить
                                  <i className='material-icons right'>
                                      send
                                  </i>
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          )
      }
  }