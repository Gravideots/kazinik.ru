import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAdminPage, selectSectionToCreate, createNewSection} from './actions.js';

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
        super(props)
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getAdminPage());
    }

    render() {
        let {content, dispatch} = this.props
        if (content) {
            return (
                <div className='AdminPage'>
                    <NewSectionCreation content={content} dispatch={dispatch}/>
                </div>
            )
        } else {
            return (
                <div className='AdminPage'>
                    <h1>Тут Пусто!</h1>
                </div>
            )
        }

    }
}

class NewSectionCreation extends Component {
    static propTypes = {
        content: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {content, dispatch} = this.props
        if (content.PosibleSections) 
            return (
                <div className="container">
                    <div className="row">
                        < div className="col s12">
                            Здесь можно дабавить или удалить разделы
                        </div>
                        {content
                            .PosibleSections
                            .map(function (element, i) {
                                return <Element element={element} key={i} dispatch={dispatch}/>
                            }, this)}
                    </div>
                </div>
            )
        else 
            return (
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h5>Создание нового раздела</h5>
                        </div>
                        < CreateNewSection dispatch={dispatch}/>
                    </div>
                </div>
            )
    }
}

class Element extends Component {

    static propTypes = {
        element: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    selectSectionToCreate(type) {
        const {dispatch} = this.props
        dispatch(selectSectionToCreate(type))
    }

    render() {
        let {element} = this.props
        return (
            <div className="element col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">
                            {element.name}
                        </span>
                        <p>I am a very simple card. I am good at containing small bits of information. I
                            am convenient because I require little markup to use effectively.</p>
                    </div>
                    <div className="card-action">
                        < a onClick= { () => { this.selectSectionToCreate(element.type) } }>
                            Создать
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

class CreateNewSection extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)

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
        const {dispatch} = this.props;
        dispatch(createNewSection(this.state))
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
                break
        }
    }

    render() {
        return (
            <div className="row">
                <form className="col s12" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                id="title"
                                type="text"
                                className="validate"
                                value={this.state.title}
                                onChange=
                                { (e) => { this.handleChange(e) } }/>
                            <label htmlFor="title">
                                Название раздела
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                id="description"
                                className="materialize-textarea"
                                value={this.state.description}
                                onChange=
                                { (e) => { this.handleChange(e) } }></textarea>
                            < label htmlFor="description">
                                Описание
                            </label>
                        </div>
                    </div>
                    <p>
                        Добавить раздел
                    </p>
                    <div className="row">
                        < div className='col s6'>
                            <input
                                type="checkbox"
                                id="addToMain"
                                onChange=
                                {(e) => { this.handleChange(e) }}
                                checked={this.state.addToMain}/>
                            <label htmlFor="addToMain">
                                На главную страницу
                            </label>
                        </div>
                        < div className='col s6'>
                            <input
                                type="checkbox"
                                id="addToSidebar"
                                onChange=
                                {(e) => { this.handleChange(e) }}
                                checked={this.state.addToSidebar}/>
                            <label htmlFor="addToSidebar">
                                На боковую панель
                            </label>
                        </div >
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">
                        Добавить < i className = "material-icons right" > send
                    </i>
                </button >
            </form>
        </div>
        )
    }
}