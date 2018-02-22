import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import {getAdminPage, leaveAdminPage, getPossibleSectiosList} from './actions.js';

import {SectionsList, CreateNewSection, EditSection, UsersSection} from './sectionManagement';
import {AddContent, ContentCreation} from './contentManagement';

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
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {dispatch, token, location} = this.props;

		if (token) {
			dispatch(getAdminPage());
			dispatch(getPossibleSectiosList());
		}
	}

	componentWillUnmount() {
		const {dispatch} = this.props;
		dispatch(leaveAdminPage());
	}
	render() {
		const {content, dispatch, token} = this.props;

		if (!token) {
			return <Redirect to='/login'/>;
		}

		if (content) {
			if (content.Users) {
				return <UsersSection users={content.Users} dispatch={dispatch}/>;
			}
			if (content.PosibleSections) {
				return <SectionsList content={content.PosibleSections} dispatch={dispatch}/>;
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
			if (content.ContentToCreate) return (
				<ContentCreation contentToCreate={content.ContentToCreate} dispatch={dispatch}/>
			);
		} else {
			// TODO переделать на прелоадер
			return <AdminStart/>;
		}
	}
}
Admin.propTypes = {
	content: PropTypes.object,
	dispatch: PropTypes.func
};

class AdminStart extends Component {
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
AdminStart.propTypes = {
	dispatch: PropTypes.func
};
