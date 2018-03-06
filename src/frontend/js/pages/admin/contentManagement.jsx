import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {openContentCreation, openContentEditor, addMedia, editMedia, deleteMedia} from './actions.js';

import MediaListElement from 'components/list/media';
import NoteListElement from 'components/list/note';
import Button from 'components/button';
import Notes from './sections/Notes';
import Articles from './sections/Articles';
import Events from './sections/Events';
import Media from './sections/Media';

export class AddContent extends Component {
	constructor(props) {
		super(props);
	}

	openCreateContentPage(event, contentToCreate) {
		event.preventDefault();
		const {dispatch} = this.props;
		dispatch(openContentCreation(contentToCreate));
	}

	render() {
		let {content, dispatch} = this.props;
		let contentType = {
			ContentToCreate: {
				id: content.Section._id,
				type: content.Section.Type
			}};

		return (
			<div className='AdminPage'>
				<h5 className='center'>
					{content.Section.Title}
				</h5>
				<div className='container'>
					<div
						className='row add-content valign-wrapper'
						onClick=
							{ (event) => { this.openCreateContentPage(event, contentType); } }>
						<div className='col s12 center-align'>
							<a className='btn-floating btn-large waves-effect waves-light'>
								<i className='material-icons'>
									add
								</i>
							</a>
							<p className='col s12  grey-text text-darken-3 center-align'>
								Добавить {content.Section.Title}
							</p>
						</div>
					</div>
					<ContentList
						content={content.Section}
						contentType={content.Section.Type}
						dispatch={dispatch}/>
				</div>
			</div>
		);
	}
}
AddContent.propTypes = {
	content: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};

export class ContentCreation extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { contentToCreate, dispatch } = this.props;

		switch (contentToCreate.type) {
		case 'Notes': return <Notes sectionID={contentToCreate.id} dispatch={dispatch} />;
		case 'Media': return <Media sectionID={contentToCreate.id} dispatch={dispatch} action={addMedia}/>;
		case 'Events': return <Events/>;
		default: return null;
		}
	}
}
ContentCreation.propTypes = {
	contentToCreate: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};

export class ContentEditor extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { contentToEdit, dispatch } = this.props;

		switch (contentToEdit.type) {
		case 'Notes': return <Notes sectionID={contentToEdit.sectionID} dispatch={dispatch} />;
		case 'Media': return <Media sectionID={contentToEdit.sectionID} dispatch={dispatch} action={editMedia} data={contentToEdit.media}/>;
		case 'Events': return <Events/>;
		default: return null;
		}
	}
}
ContentEditor.propTypes = {
	contentToEdit: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};

class ContentList extends Component {
	render() {
		let {content, contentType, dispatch} = this.props;

		if (content && contentType) {
			var data = content.Listing[contentType];

			switch (contentType) {
			case 'Media':
				return (
					<MediaContent content={content} data={data} dispatch={dispatch}/>
				);
			case 'Notes':
				return (
					<NotesContent content={content} data={data} dispatch={dispatch}/>
				);
			}
		}
		return (
			<div>
        Некое содержание
			</div>
		);
	}
}
ContentList.propTypes = {
	content: PropTypes.object,
	contentType: PropTypes.string,
	dispatch: PropTypes.func
};

const MediaContent = ({content, data, dispatch}) => {
	const deleteVideo = (sectionID, mediaID, tags) => {
		dispatch(deleteMedia(sectionID, mediaID, tags));
	};
	const editVideo = (sectionID, media) => {
		dispatch(openContentEditor(
			{
				ContentToEdit: {
					sectionID: sectionID,
					media: media,
					type: 'Media'
				}
			}
		));
		// dispatch(editMedia(sectionID, mediaID, tags));
	};
	return (
		<div className='row'>
			{ data.map((listElement, key) => {
				return (<div className='row grey lighten-5 ' key={key}>
					<div className="col s12">
						<div className='col l10'>
							<MediaListElement data={listElement}/>
						</div>
						<Button onClick= {
							() => { editVideo(content._id, listElement); }
						}>
							<i className="small material-icons col l2 edit-button">
								mode_edit
							</i>
						</Button>
						<Button onClick= {
							() => { deleteVideo(content._id, listElement._id, listElement.Tags); }
						}>
							<i className="small material-icons col l2 edit-button">
              clear
							</i>
						</Button>
					</div>
				</div>);
			})}
		</div>
	);
};
MediaContent.propTypes = {
	content: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired
};

const NotesContent = ({content, data, dispatch}) =>  {
	const deleteVideo = (sectionID, mediaID, tags) => {
		dispatch(deleteMedia(sectionID, mediaID, tags));
	};
	return (
		<div className='row'>
			{ data.map((listElement, key) => {
				console.log(data);
				return (<div className='row grey lighten-5 ' key={key}>
					<div className="col s12">
						<div className='col l10'>
							<NoteListElement data={listElement}/>
						</div>
						<i className="small material-icons col l2 edit-button">
              mode_edit
						</i>
						<Button onClick= {
							() => { deleteVideo(content._id, listElement._id, listElement.Tags); }
						}>
							<i className="small material-icons col l2 edit-button">
              clear
							</i>
						</Button>
					</div>
				</div>);
			})}
		</div>
	);
};
NotesContent.propTypes = {
	content: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired
};
