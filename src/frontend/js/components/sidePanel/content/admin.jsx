import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getPossibleSectiosList, getUsersList, selectSectionToEdit, selectSectionToAddContent} from 'pages/admin/actions.js';

import Button from 'components/button';


export default class SidebarAdminContent extends Component {

  static propTypes = {
      title: PropTypes.string,
      fixed: PropTypes.bool,
      content: PropTypes.object,
      dispatch: PropTypes.func
  }

  constructor(props) {
      super(props)
  }

  getPossibleSectios() {
      const {dispatch} = this.props
      dispatch(getPossibleSectiosList());
  }

  getUsers() {
      const {dispatch} = this.props
      dispatch(getUsersList());
  }

  selectSectionToEdit(event, sectionID) {
      event.preventDefault()
      const {dispatch} = this.props
      dispatch(selectSectionToEdit(sectionID))
  }

  selectSectionToAddContent(event, sectionID) {
      event.preventDefault()
      const {dispatch} = this.props
      dispatch(selectSectionToAddContent(sectionID))
  }

  render() {
      let {title, content} = this.props;

      let ExistingSections
      if (content && content.ExistingSections) {
          ExistingSections = (content.ExistingSections.map(function (element, i) {
              return <Button
                  text={element.Title}
                  onClick=
                  { (event) => { this.selectSectionToAddContent(event, element._id) } }
                  key={i}/>
          }, this))
      }

      return (
          <div>
              <div className='Title'>
                  <h5>
                      {this.props.title || 'Заглушка'}
                  </h5>
              </div>
              <div>
                  <Button
                      onClick={() => {
                          this.getUsers()
                      }}
                      text='Пользователи'
                  />
                  <Button
                      onClick={() => {
                          this.getPossibleSectios()
                      }}
                      text='Разделы'
                  />
                  {ExistingSections}
              </div>
          </div>
      )
  }
}
