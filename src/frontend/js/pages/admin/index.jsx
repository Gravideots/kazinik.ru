import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getAdminPage} from './actions.js';

import {GetSectionsList, CreateNewSection, EditSection} from './sectionManagement'
import {AddContent, ContentCreation} from './contentManagement'

import Sidebar from 'components/sidePanel';

@connect(state => ({
  content: state
    .admin
    .get('asyncData'),
  asyncError: state
    .admin
    .get('asyncError'),
  asyncLoading: state
    .admin
    .get('asyncLoading')
}))

export default class Admin extends Component {
  static propTypes = {
    content: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(getAdminPage());
  }

  render() {
    const {content, dispatch} = this.props;

    if (content) {
      if (content.PosibleSections) {
        return <GetSectionsList content={content.PosibleSections} dispatch={dispatch}/>;
      }
      if (content.NewSection) {
        return <CreateNewSection content={content} dispatch={dispatch}/>;
      }
      if (content.Section) {
        return <EditSection content={content.Section} dispatch={dispatch}/>;
      }
      if (content.ContentManagement) {
        return <AddContent content={content.ContentManagement} dispatch={dispatch}/>;
      }
      if (content.ContentToCreate) 
        return <ContentCreation contentToCreate={content.ContentToCreate} dispatch={dispatch}/>;
      }
    else {
      return <AdminStart/>;
    }

  }
}

class AdminStart extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='AdminPage'>
        <h1>Это стартовая страница</h1>
        <h2>пока тут Пусто</h2>
      </div>
    );
  }
}
