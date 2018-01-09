import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {openContentCreation, addMedia, deleteMedia} from './actions.js';

import MediaListElement from 'components/list/media'
import Notes from './sections/Notes'
import Articles from './sections/Articles'
import Events from './sections/Events'
import Media from './sections/Media'

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

    render() {

        let {content, dispatch} = this.props;
        let contentType = {
            ContentToCreate: {
            id: content.Section._id,
            type: content.Section.Type
        }}

        return (
            <div className='AdminPage'>
                <h5 className='center'>
                    {content.Section.Title}
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
                        contentType={content.Section.Type}
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
    constructor( props ) {
        super( props );
    }
    render() {
        const { contentToCreate, dispatch } = this.props
        
        switch( contentToCreate.type){
            case 'Notes': return <Notes sectionID={contentToCreate.id} dispatch={dispatch} />;
            case 'Media': return <Media sectionID={contentToCreate.id} dispatch={dispatch} action={addMedia}/>;
            case 'Events': return <Events/>;
            default: return null;
        }
    }
}

class ContentList extends Component {
    static propTypes = {
        content: PropTypes.object,
        contentType: PropTypes.string,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    deleteMedia(event, sectionID, mediaID, tags) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(deleteMedia(sectionID, mediaID, tags));
    }

    render() {
        let {content, contentType} = this.props
        if (content && contentType) {
            
            switch (contentType) {
                case 'Media':
                    let data = content.Listing;
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
                                                { (event) => { this.deleteMedia(event, content._id, listElement._id, listElement.Tags ) } }>
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