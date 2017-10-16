import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    getAdminPage,
    createNewSection,
    updateSection,
    deleteSection,

    selectSectionToCreate,
    selectSectionToEdit
} from './actions.js';

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
            if (content.PosibleSections) 
                return <SectionManagement content={content.PosibleSections} dispatch={dispatch}/>
            if (content.NewSection) 
                return <CreateNewSection content={content} dispatch={dispatch}/>
            if (content.Section) 
                return <EditSection content={content.Section} dispatch={dispatch}/>
        } else 
            return <AdminStart/>

    }
}

class AdminStart extends Component {

    static propTypes = {
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='AdminPage'>
                <h1>Это стартовая страница</h1>
                <h2>пока тут Пусто</h2>
            </div>
        )
    }
}

class SectionManagement extends Component {
    static propTypes = {
        content: PropTypes.arrayOf(PropTypes.object),
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {content, dispatch} = this.props
        return (
            <div className='AdminPage'>
                <h5>Панель управления разделами</h5>
                <div className="row">
                    < div className="col s12"></div>
                    {content
                        .map(function (element, i) {
                            return <Element element={element} key={i} dispatch={dispatch}/>
                        }, this)}
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

    selectSectionToCreate(event, element) {
        event.preventDefault()
        const {dispatch} = this.props
        dispatch(selectSectionToCreate(element))
    }

    selectSectionToEdit(event, sectionID) {
        event.preventDefault()
        const {dispatch} = this.props
        dispatch(selectSectionToEdit(sectionID))
    }

    deleteSection(event, sectionID) {
        event.preventDefault()
        const {dispatch} = this.props
        dispatch(deleteSection(sectionID))
    }

    render() {
        let {element} = this.props
        let actions

        if (element.exists && element.id) {
            actions = (
                <div className="card-action">
                    <a
                        href="#"
                        onClick=
                        { (event) => { this.selectSectionToEdit(event, element.id) } }>
                        Редактировать
                    </a>
                    <a href="#" onClick= { (event) => { this.deleteSection(event, element.id) } }>
                        Удалить
                    </a>
                </div>
            )
        } else {
            actions = (
                <div className="card-action">
                    <a
                        href="#"
                        onClick=
                        { (event) => { this.selectSectionToCreate(event, element) } }>
                        Создать
                    </a>
                </div>
            )
        }
        return (
            <div className="element col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">
                            {element.name}
                        </span>
                        <p>{element.description}</p>
                    </div>
                    {actions}
                </div>
            </div>
        )
    }
}

class CreateNewSection extends Component {
    static propTypes = {
        content: PropTypes.object,
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
        const {dispatch, content} = this.props;
        dispatch(createNewSection(this.state, content.NewSection))
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
            <div className='AdminPage'>
                <h5>Создание нового раздела</h5>
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
        </div>
        )
    }
}

class EditSection extends Component {
    static propTypes = {
        content: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)

        console.log(this.props.content)
        this.state = {
            id: this.props.content._id,
            title: this.props.content.Title,
            description: this.props.content.Description,
            addToMain: this.props.content.Active,
            addToSidebar: this.props.content.ShowInSadebar
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        console.log(this.state)
        dispatch(updateSection(this.state))
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
            <div className='AdminPage'>
                < h5 >
                    Редактирование раздела
                </h5>
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
                            </div>
                        </div >
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea
                                    id="description"
                                    className="materialize-textarea"
                                    value={this.state.description}
                                    onChange=
                                    { (e) => { this.handleChange(e) } }></textarea>
                            </div>
                        </div>
                        < p >
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
                        </div >
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                            Обновить < i className = "material-icons right" > send
                        </i>
                    </button >
                </form>
            </div >
            <hr/>
        </div>
        )
    }
}