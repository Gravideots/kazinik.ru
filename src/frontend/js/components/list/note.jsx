import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {routeCodes} from 'config/routes';
import {notesStore} from '../../stores/NotesStore';

import Text from 'components/text';
import Image from 'components/image';
import Button from 'components/button';

@observer
export default class NoteListElement extends Component {
	render() {
		const {data, type} = this.props;

		if (!data) return null;
		let date = data.Date ? new Date(data.Date) : null;
		return (
			<div className='NoteListElement row'>
				<div className='col s12 m4'>
					<Text type='NoteListElement__imagesupper'>{data.Author + ' ' + (date ? date.toLocaleDateString('ru-RU') : '') } </Text>
					<Image src={ data.TitleImage ? data.TitleImage.Crop ? data.TitleImage.Crop : data.TitleImage.Full ? data.TitleImage.Full : '' : '' }/>
					<Text type='NoteListElement__imagesub'>{ data.SubTitle ? data.SubTitle.slice(0, 400) + '...' : '' }</Text>
				</div>
				<div className='col s12 m8'>
					<Text type='subheader bold NoteListElement__title'>«{data.Title}»</Text>
					<Text type='NoteListElement__maintext'>{data.Description.slice(0, 900) + '...'}</Text>
					<Link className='col s12 m3'
						to={{ pathname: routeCodes.NOTE + data.Id, data }}>
						<Button text='Читать далее >>>' onClick={() => notesStore.setParams(data)}/>
					</Link>
				</div>
			</div>
		);
	}
}
