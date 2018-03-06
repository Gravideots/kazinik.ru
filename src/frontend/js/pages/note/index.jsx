import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import api from 'api/index.js';

import {notesStore} from '../../stores/NotesStore';

import Text from 'components/text';
import Image from 'components/image';
import Icon from 'components/icon';
import Button from 'components/button';
import TextSlider from 'components/textSlider';

@observer
export default class Note extends Component {
	@observable notePageData = {};
	componentWillMount() {
		if (!notesStore.data._id) {
			const {match} = this.props;
			this.getNotesFromServerStore(match.params.id);
		} else {
			this.notePageData = notesStore;
		}
	}
	getNotesFromServerStore = async (name) => {
		let response = await api.getNotePage(name);
		this.notePageData = Object.assign(this.notePageData, response);
	}
	render() {
		const {notePageData} = this;

		let titleImage = {
			full: 'url',
			crop: 'url'
		};
		let texts = [];
		let title = 'Title';
		let subTitle = 'subTitle';
		let description = 'description';
		let athor = 'athor';

		if (notePageData) {
			titleImage = notePageData.TitleImage;
			title = notePageData.Title;
			subTitle = notePageData.SubTitle;
			description = notePageData.Description;
			texts = notePageData.Note;
			athor = notePageData.Author;
		} else return null;

		return (
			<div className='Note'>
				<div className='imageCoverBlock'>
					<Image background={true} src={ titleImage.Full }/>
				</div>
				<div className='container'>
					<Text type='header bold center Note__title'>
						«{title}»
					</Text>
					<Text type='subheader italic center hide-on-med-and-down Note__subtitle'>
						{subTitle}
					</Text>
					<Text type='hide-on-med-and-down'>
						{description}
					</Text>
				</div>
				<div className='container noteBlock hide-on-med-and-down'>
					{texts.map((text, i) => {
						return  <div key={i} className='row'>
							{(text.Title && text.Title !== null) ? <Text  type='subheader center noteBlock__title'>{text.Title}</Text> : null}
							{(text.Text && text.Text !== null) ? <Text>{text.Text}</Text> : null}
							{(text.Question && text.Question !== null) ? <Text type='bold question'>— {text.Question}</Text> : null}
							{(text.Answer && text.Answer !== null) ? <Text type='answer'>— {text.Answer}</Text> : null}
							<div className='col s6 offset-s3'>
								<Image background={false} src={ text.Image }/>
							</div>
						</div>;
					})
					}
				</div>
				<div className='container hide-on-med-and-down'>
					<div className='row'>
						<Text type='right italic'>{athor}</Text>
					</div>
				</div>
			</div>
		);
	}
}

Note.propTypes = {
	notePageData: PropTypes.object
};
