import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Element from './sections/element'

import {createNewSection, updateSection, deleteSection} from './actions.js';
import Users from './sections/users'

export class SectionsList extends Component {
    static propTypes = {
        content: PropTypes.arrayOf(PropTypes.object),
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {content, dispatch} = this.props;
        return (
            <div className='AdminPage'>
                <h5>Панель управления разделами</h5>
                <div className='row'>
                    <div className='col s12'/> {content.map((element, i) => {
                        return <Element element={element} key={i} dispatch={dispatch}/>;
                    }, this)}
                </div>
            </div>
        );
    }
}

export class CreateNewSection extends Component {
    static propTypes = {
        content: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.handleChange = this
            .handleChange
            .bind(this);

        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        this.state = {
            title: '',
            description: '',
            addToMain: true,
            addToSidebar: true
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const {dispatch, content} = this.props;
        dispatch(createNewSection(this.state, content.NewSection));
    }

    handleChange(event) {
        switch (event.target.id) {
            case 'title':
                this.setState({title: event.target.value});
                break;
            case 'description':
                this.setState({description: event.target.value});
                break;
            case 'addToMain':
                this.setState({addToMain: event.target.checked});
                break;
            case 'addToSidebar':
                this.setState({addToSidebar: event.target.checked});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className='AdminPage'>
                <h5>Создание нового раздела</h5>
                <div className='row'>
                    <form className='col s12' onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input
                                    id='title'
                                    type='text'
                                    className='validate'
                                    value={this.state.title}
                                    onChange={(e) => {
                                    this.handleChange(e);
                                }}/>
                                <label htmlFor='title'>
                                    Название раздела
                                </label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <textarea
                                    id='description'
                                    className='materialize-textarea'
                                    value={this.state.description}
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}/>
                                <label htmlFor='description'>
                                    Описание
                                </label>
                            </div>
                        </div>
                        <p>
                            Добавить раздел
                        </p>
                        <div className='row'>
                            <div className='col s6'>
                                <input
                                    type='checkbox'
                                    id='addToMain'
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                    checked={this.state.addToMain}/>
                                <label htmlFor='addToMain'>
                                    На главную страницу
                                </label>
                            </div>
                            <div className='col s6'>
                                <input
                                    type='checkbox'
                                    id='addToSidebar'
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                    checked={this.state.addToSidebar}/>
                                <label htmlFor='addToSidebar'>
                                    На боковую панель
                                </label>
                            </div>
                        </div>
                        <button className='btn waves-effect waves-light' type='submit' name='action'>
                            Добавить
                            <i className='material-icons right'>
                                send
                            </i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
};

export class EditSection extends Component {
    static propTypes = {
        content: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.content._id,
            title: this.props.content.Title,
            description: this.props.content.Description,
            addToMain: this.props.content.Active,
            addToSidebar: this.props.content.ShowInSadebar
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(updateSection(this.state));
    }

    handleChange(event) {
        switch (event.target.id) {
            case 'title':
                this.setState({title: event.target.value});
                break;
            case 'description':
                this.setState({description: event.target.value});
                break;
            case 'addToMain':
                this.setState({addToMain: event.target.checked});
                break;
            case 'addToSidebar':
                this.setState({addToSidebar: event.target.checked});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className='AdminPage'>
                <h5>
                    Редактирование раздела
                </h5>
                <div className='row'>
                    <form className='col s12' onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input
                                    id='title'
                                    type='text'
                                    className='validate'
                                    value={this.state.title}
                                    onChange={(e) => {
                                    this.handleChange(e);
                                }}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <textarea
                                    id='description'
                                    className='materialize-textarea'
                                    value={this.state.description}
                                    onChange={(e) => {
                                    this.handleChange(e);
                                }}></textarea>
                            </div>
                        </div>
                        <p>
                            Добавить раздел
                        </p>
                        <div className='row'>
                            <div className='col s6'>
                                <input
                                    type='checkbox'
                                    id='addToMain'
                                    onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                    checked={this.state.addToMain}/>
                                <label htmlFor='addToMain'>
                                    На главную страницу
                                </label>
                            </div>
                            <div className='col s6'>
                                <input
                                    type='checkbox'
                                    id='addToSidebar'
                                    onChange={(e) => {
                                    this.handleChange(e);
                                }}
                                    checked={this.state.addToSidebar}/>
                                <label htmlFor='addToSidebar'>
                                    На боковую панель
                                </label>
                            </div>
                        </div>
                        <button className='btn waves-effect waves-light' type='submit' name='action'>
                            Обновить
                            <i className='material-icons right'>
                                send
                            </i>
                        </button>
                    </form>
                </div>
                <hr/>
            </div>
        )
    }
}

export class UsersSection extends Component{
    static propTypes = {
        users: PropTypes.arrayOf(PropTypes.object),
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {users, dispatch} = this.props;
        return (
            <div className='AdminPage'>
                <h5>Панель управления пользователями</h5>
                <Users list={users} dispatch={dispatch}/>
            </div>
        );
    }
}