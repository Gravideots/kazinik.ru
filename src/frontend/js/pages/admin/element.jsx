import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {deleteSection, selectSectionToCreate, selectSectionToEdit} from './actions.js';

export default class Element extends Component {
    static propTypes = {
        element: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    selectSectionToCreate(event, element) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(selectSectionToCreate(element));
    }

    selectSectionToEdit(event, sectionID) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(selectSectionToEdit(sectionID));
    }

    deleteSection(event, sectionID) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(deleteSection(sectionID));
    }

    render() {
        const {element} = this.props;
        let actions;

        if (element.exists && element.id) {
            actions = (
                <div className='card-action'>
                    <a
                        href='#'
                        onClick={(event) => {
                        this.selectSectionToEdit(event, element.id);
                    }}>
                        Редактировать
                    </a>
                    <a
                        href='#'
                        onClick={(event) => {
                        this.deleteSection(event, element.id);
                    }}>
                        Удалить
                    </a>
                </div>
            );
        } else {
            actions = (
                <div className='card-action'>
                    <a
                        href='#'
                        onClick={(event) => {
                        this.selectSectionToCreate(event, element);
                    }}>
                        Создать
                    </a>
                </div>
            );
        }
        return (
            <div className='element col s12 m6'>
                <div className='card black darken-1'>
                    <div className='card-content white-text'>
                        <span className='card-title'>
                            {element.name}
                        </span>
                        <p>{element.description}</p>
                    </div>
                    {actions}
                </div>
            </div>
        );
    }
}