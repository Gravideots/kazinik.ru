import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createNote } from '../actions.js';

import Button from 'components/button';
import Text from 'components/text';
import TextArea from 'components/textArea';
import Input from 'components/input';
import Icon from 'components/icon';
import ImageInput from 'components/input/imageInput';

@connect()
export default class Note extends Component {
	constructor(props) {
		super(props);

		this.state = {
			note: null,
			type: null
		};

		this.handeType = this.handeType.bind(this);
	}

	handeType(type) {
		this.setState({type: type});
	}

	render() {
		const { dispatch } = this.props;
		const { type } = this.state;
		const noteCreator = (type === 'Article') ? <Article dispatch={dispatch}/> : <Interview dispatch={dispatch}/>;

		return (
			<div className='AdminPage Note'>
				{
					!type ? <Buttons onClick={this.handeType}/> : noteCreator
				}
			</div>
		);
	}
}

class Buttons extends Component {
	render() {
		const {onClick} = this.props;
		return (
			<div className='Buttons'>
				<Button onClick={() => onClick('Article')}>
					<div>
						<a className='btn-floating btn-large waves-effect waves-light'>
							<i className='material-icons'>
								add
							</i>
						</a>
						<p className='col s12  grey-text text-darken-3 center-align'>
						Добавить статью
						</p>
					</div>
				</Button>
				<Button onClick={() => onClick('Interview')}>
					<div>
						<a className='btn-floating btn-large waves-effect waves-light'>
							<i className='material-icons'>
								add
							</i>
						</a>
						<p className='col s12  grey-text text-darken-3 center-align'>
						Добавить интервью
						</p>
					</div>
				</Button>
			</div>
		);
	}
}

class Interview extends Component {
	static propTypes = {
		dispatch: PropTypes.func
	}

	constructor(props) {
		super(props);

		this.state = {
			preview: null,
			interview: { Note: [] },
			mainTitleInputInstance: null,
			authorInputInstance: null,
			descriptionInputInstance: null
		};

		this.createNotesField = this.createNotesField.bind(this);
		this.removeNotesField = this.removeNotesField.bind(this);
	}

	createNotesField(type) {
		var self = this;

		const { interview } = this.state;

		switch (type) {
		case 'title':
			interview.Note.push({ Title: '' });
			self.setState({ interview: interview });
			break;
		case 'text':
			interview.Note.push({ Text: '' });
			self.setState({ interview: interview });
			break;
		case 'image':
			interview.Note.push({ Image: '' });
			self.setState({ interview: interview });
			break;
		case 'question':
			interview.Note.push({ Question: '' });
			self.setState({ interview: interview });
			break;
		case 'answer':
			interview.Note.push({ Answer: '' });
			self.setState({ interview: interview });
			break;
		}
	}


	removeNotesField(index) {
		const { interview } = this.state;

		interview.Note.splice(index, 1);
		this.setState({atricle: interview});
	}

	render() {
		const { dispatch } = this.props;

		let { interview, mainTitleInputInstance, authorInputInstance, descriptionInputInstance  } = this.state;

		return (
			<div className='Article'>
				<h5 className='center'>
						Новая статья
				</h5>
				<div className='row'>
					<div className='row add-content valign-wrapper'>
						<ImageInput title='Заглавное изображение' onChange={ (e) => { interview.TitleImage = e; this.setState({ interview: interview }); } }/>
					</div>
					<div className='input-field col s12'>
						<Input ref={e => mainTitleInputInstance = e} placeholder='Заголовок' type='text' name={ interview.Title ? 'header filed' : 'header' } onChange={ (e) => { interview.Title = e; this.setState({ interview: interview }); } }/>
					</div>

					<div className='input-field col s12'>
						<Input ref={e => authorInputInstance = e} placeholder='Интервьюер' type='text' name={ interview.Author ? 'author filed' : 'author' } onChange={ (e) => { interview.Author = e; this.setState({ interview: interview }); } }/>
					</div>

					<div className='input-field col s12'>
						<TextArea rows={2} ref={e => descriptionInputInstance = e} placeholder='Описание' type='text' name={ interview.Description ? 'description filed' : 'description' } onChange={ (e) => { interview.Description = e; this.setState({ interview: interview }); } }/>
					</div>

					<p className='col s12 dash'/>

					{
						interview.Note && interview.Note.map((elem, key) => {
							let keyVar = Math.random().toString();
							if (elem.Title != void 0) return <CreatedContent key={ keyVar } index={key} elem={ elem } remove={this.removeNotesField} type='Title' />;
							if (elem.Text != void 0) return <CreatedContent key={ keyVar } index={key} elem={ elem } remove={this.removeNotesField} type='Text' />;
							if (elem.Image != void 0) return <CreatedContent key={ keyVar } index={key} elem={ elem } remove={this.removeNotesField} type='Image' />;
							if (elem.Question != void 0) return <CreatedContent key={ keyVar } index={key} elem={ elem } remove={this.removeNotesField} type='Question' />;
							if (elem.Answer != void 0) return <CreatedContent key={ keyVar } index={key} elem={ elem } remove={this.removeNotesField} type='Answer' />;
						})
					}

					<div className='col s12'>
						<InterviewControll action={ this.createNotesField } />
					</div>

					<div className='SaveButtonContainer'>
						<Button text='Сохранить' onClick={ () => dispatch(createNote(interview)) }/>
					</div>
				</div>
			</div>
		);
	}
}

class InterviewControll extends Component {
	render() {
		const {
			action
		} = this.props;

		return (
			<div className='NoteControll'>
				<Button onClick={ () => action('title') } text='Добавить подзаголовок' icon="title"/>
				<Button onClick={ () => action('text') } text='Добавить текст' icon="text_fields"/>
				<Button onClick={ () => action('image') } text='Добавить изображение' icon="photo"/>
				<Button onClick={ () => action('question') } text='Добавить вопрос' icon="photo"/>
				<Button onClick={ () => action('answer') } text='Добавить ответ' icon="photo"/>
			</div>
		);
	}
}

class Article extends Component {
	static propTypes = {
		dispatch: PropTypes.func
	}

	constructor(props) {
		super(props);

		this.state = {
			preview: null,
			article: { Note: [] },
			mainTitleInputInstance: null,
			authorInputInstance: null,
			descriptionInputInstance: null
		};

		this.createNotesField = this.createNotesField.bind(this);
		this.removeNotesField = this.removeNotesField.bind(this);
	}

	createNotesField(type) {
		var self = this;

		const { article } = this.state;

		switch (type) {
		case 'title':
			article.Note.push({ Title: '' });
			self.setState({ article: article });
			break;
		case 'text':
			article.Note.push({ Text: '' });
			self.setState({ article: article });
			break;
		case 'image':
			article.Note.push({ Image: '' });
			self.setState({ article: article });
			break;
		}
	}


	removeNotesField(index) {
		const { article } = this.state;

		article.Note.splice(index, 1);
		this.setState({atricle: article});
	}

	render() {
		const { dispatch } = this.props;

		let { article, interview, mainTitleInputInstance, authorInputInstance, descriptionInputInstance  } = this.state;

		return (
			<div className='Article'>
				<h5 className='center'>
						Новая статья
				</h5>
				<div className='row'>
					<div className='row add-content valign-wrapper'>
						<ImageInput title='Заглавное изображение' onChange={ (e) => { article.TitleImage = e; this.setState({ article: article }); } }/>
					</div>
					<div className='input-field col s12'>
						<Input ref={e => mainTitleInputInstance = e} placeholder='Заголовок' type='text' name={ article.Title ? 'header filed' : 'header' } onChange={ (e) => { article.Title = e; this.setState({ article: article }); } }/>
					</div>

					<div className='input-field col s12'>
						<Input ref={e => authorInputInstance = e} placeholder='Автор' type='text' name={ article.Author ? 'author filed' : 'author' } onChange={ (e) => { article.Author = e; this.setState({ article: article }); } }/>
					</div>

					<div className='input-field col s12'>
						<TextArea rows={2} ref={e => descriptionInputInstance = e} placeholder='Описание' type='text' name={ article.Description ? 'description filed' : 'description' } onChange={ (e) => { article.Description = e; this.setState({ article: article }); } }/>
					</div>

					<p className='col s12 dash'/>

					{
						article.Note && article.Note.map((elem, key) => {
							let keyVar = Math.random().toString();
							if (elem.Title != void 0) return <CreatedContent key={ keyVar } index={key} elem={ elem } remove={this.removeNotesField} type='Title' />;
							if (elem.Text != void 0) return <CreatedContent key={ keyVar } index={key} elem={ elem } remove={this.removeNotesField} type='Text' />;
							if (elem.Image != void 0) return <CreatedContent key={ keyVar } index={key} elem={ elem } remove={this.removeNotesField} type='Image' />;
						})
					}

					<div className='col s12'>
						<ArticleControll action={ this.createNotesField } />
					</div>

					<div className='SaveButtonContainer'>
						<Button text='Сохранить' onClick={ () => dispatch(createNote(article)) }/>
					</div>
				</div>
			</div>
		);
	}
}

class ArticleControll extends Component {
	render() {
		const {
			action
		} = this.props;

		return (
			<div className='NoteControll'>
				<Button onClick={ () => action('title') } text='Добавить подзаголовок' icon="title"/>
				<Button onClick={ () => action('text') } text='Добавить текст' icon="text_fields"/>
				<Button onClick={ () => action('image') } text='Добавить изображение' icon="photo"/>
			</div>
		);
	}
}
class CreatedContent extends Component {
	constructor(props) {
		super(props);

		this.state = { field: null, text: '' };
	}

	render() {
		let { field, text } = this.state;
		const { elem, type, index, remove } =  this.props;

		window.scrollTo(0, document.body.clientHeight);
		switch (type) {
		case 'Title':
			return (
				<div className='row'>
					<div className='col s3'>
						<Button onClick={() => remove(index)}>
							<Icon iconName='close' size='small'/>
						</Button>
					</div>
					<div className='input-field col s12'>
						<Input val={elem.Title} ref={e => field = e} placeholder='Подзаголовок' type='text' name={ text.length > 0 ? 'header filed' : 'header' } onChange={ (e) => { this.setState({ text: e }); elem.Title = e; } }/>
					</div>
				</div>
			);
		case 'Text':
			return (
				<div className='row'>
					<div className='col s1'>
						<Button onClick={() => remove(index)}>
							<Icon iconName='close' size='small'/>
						</Button>
					</div>
					<div className='input-field col s12'>
						<TextArea rows={2} val={elem.Text} ref={e => field = e} placeholder='Текст' type='text' name={ text.length > 0 ? 'description filed' : 'description' } onChange={ (e) => { this.setState({ text: e }); elem.Text = e; } }/>
					</div>
				</div>
			);
		case 'Image':
			return (
				<div className='row'>
					<div className='col s1'>
						<Button onClick={() => remove(index)}>
							<Icon iconName='close' size='small'/>
						</Button>
					</div>
					<div className='col s12 add-content valign-wrapper'>
						<ImageInput val={elem.Image} title='Изображение' onChange={ (e) => elem.Image = e }/>
					</div>
				</div>
			);
		case 'Question':
			return (
				<div className='row'>
					<div className='col s1'>
						<Button onClick={() => remove(index)}>
							<Icon iconName='close' size='small'/>
						</Button>
					</div>
					<div className='input-field col s12'>
						<TextArea rows={2} val={elem.Text} ref={e => field = e} placeholder='Вопрос' type='text' name={ text.length > 0 ? 'description filed' : 'description' } onChange={ (e) => { this.setState({ text: e }); elem.Text = e; } }/>
					</div>
				</div>
			);
		case 'Answer':
			return (
				<div className='row'>
					<div className='col s1'>
						<Button onClick={() => remove(index)}>
							<Icon iconName='close' size='small'/>
						</Button>
					</div>
					<div className='input-field col s12'>
						<TextArea rows={2} val={elem.Text} ref={e => field = e} placeholder='Ответ' type='text' name={ text.length > 0 ? 'description filed' : 'description' } onChange={ (e) => { this.setState({ text: e }); elem.Text = e; } }/>
					</div>
				</div>
			);
		default: return null;
		}
	}
}
