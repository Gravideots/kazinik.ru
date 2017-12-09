import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {openContentCreation, addMedia, deleteMedia} from './actions.js';

import MediaListElement from '../../components/list/media'

export class AddContent extends Component {

    static propTypes = {
        content: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    openCreateContentPage(event, contentToCreate) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(openContentCreation(contentToCreate))
    }

    getSectionType(section) {
        for (var key in section.Listing) 
            if (section.Listing[key] && section.Listing[key].Available) 
                return {
                    ContentToCreate: {
                        id: section._id,
                        type: key
                    }
                }
            }

    render() {

        let {content, dispatch} = this.props
        let contentType = this.getSectionType(content.Section)

        return (
            <div className='AdminPage'>
                <h5>
                    содержанием раздела {content.Section.Title}
                </h5>
                <div className='container'>
                    <div
                        className='row add-content valign-wrapper'
                        onClick=
                        { (event) => { this.openCreateContentPage(event, contentType) } }>
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
                        contentType={contentType.ContentToCreate}
                        dispatch={dispatch}/>
                </div>
            </div>
        )
    }
}

export class ContentCreation extends Component {
    static propTypes = {
        contentToCreate: PropTypes.object,
        dispatch: PropTypes.func
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {contentToCreate, dispatch} = this.props

        if (contentToCreate.type == 'Interviews') 
            return <Interviews/>
        if (contentToCreate.type == 'Media') 
            return <CreateMedia sectionID={contentToCreate.id} dispatch={dispatch}/>
    }
}

class Interviews extends Component {
    static propTypes = {
        contentToCreate: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {contentToCreate} = this.props;

        return (
            <div className='AdminPage'>
                <h5 >
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
                                Автор/источник (ссыдка или текст)
                            </label>
                        </div>

                        <div className='input-field col s12'>
                            <input id='subTitle' type='text' className='validate'/>
                            < label htmlFor='subTitle'>
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
                                Сохранить < i className='material-icons right' > send
                            </i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

class ContentList extends Component {
    static propTypes = {
        content: PropTypes.object,
        contentType: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    deleteMedia(event, sectionID, mediaID) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(deleteMedia(sectionID, mediaID));
    }

    render() {
        let {content, contentType} = this.props
        if (content && contentType) {
            switch (contentType.type) {
                case 'Media':
                    let data = content.Listing.Media.Data;
                    return (
                        <div className='row'>
                            {data.map((listElement, key) => {
                                return <div className='row grey lighten-5 ' key={key}>
                                    <div className="col s12">
                                        <div className='col l10'>
                                            <MediaListElement data={listElement}/>
                                        </div>
                                        <i className="small material-icons col l2 edit-button">
                                            mode_edit
                                        </i>
                                        <a href='#'>
                                            <i
                                                className="small material-icons col l2 edit-button"
                                                onClick=
                                                { (event) => { this.deleteMedia(event, content._id, listElement._id ) } }>
                                                clear
                                            </i>
                                        </a>
                                    </div>
                                </div>
                            })}
                        </div>
                    );
                    break;
            }
        }
        return <div>
            Некое содержание
        </div>

    }
}

class CreateMedia extends Component {

    static propTypes = {
        sectionID: PropTypes.string,
        dispatch: PropTypes.func
    }
    constructor(props) {
        super(props)

        this.state = {
            URL: '',
            tags: '',
            sectionID: this.props.sectionID
        }
    }

    handleChange(event) {
        switch (event.target.id) {
            case 'URL':
                this.setState({URL: event.target.value});
                break;
            case 'tags':
                this.setState({tags: event.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(addMedia(this.state));
    }

    render() {
        let media

        if (this.state.URL != '') 
            media = <MediaListElement data={this.state}/>

        return (
            <div className='AdminPage'>
                <h5>Добавить медиа</h5>
                <div className='container'>
                    <form className='col s12' onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='input-field col s12'>
                            <input
                                id='URL'
                                type='text'
                                className='validate'
                                value={this.state.URL}
                                onChange=
                                { (e) => { this.handleChange(e)}}/>
                            <label htmlFor='title'>
                                Ссылка на источник(YouTube / SoundCloud /Vimeo)
                            </label>
                        </div>
                        {media}
                        <div className='input-field col s12'>
                            <input
                                id='tags'
                                type='text'
                                className='validate'
                                value={this.state.tags}
                                onChange=
                                {(e) => {this.handleChange(e)}}/>
                            <label htmlFor='title'>
                                Теги (через запятую, например: видео, выступление, конференция)
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
                    </form>
                </div>
            </div>
        )
    }
}