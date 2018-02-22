import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Articles extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {contentToCreate} = this.props;

		return (
			<div className='AdminPage'>
				<h5>
					Новая статья
				</h5>
				<form className='col s12' onSubmit={(e) => this.handleSubmit(e)}>
					<div className='container'>
						<div className='row add-content valign-wrapper'>
							<div className='col s12 center-align'>
								<i className='small material-icons'>
								image
								</i>
								<p className='col s12  grey-text text-darken-3 center-align'>
									Добавить изображение
								</p>
							</div >
						</div>

						<div className='input-field col s12'>
							<input id='title' type='text' className='validate'/>
							<label htmlFor='title'>
								Заголовок
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
							<button className='btn waves-effect waves-light' type='submit' name='action'>
								Сохранить
								<i className='material-icons right'>
									send
								</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

Articles.propTypes = {
	contentToCreate: PropTypes.object,
	dispatch: PropTypes.func
};
