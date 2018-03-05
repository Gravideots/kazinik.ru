import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import {getEventPage} from './actions.js';

import Text from 'components/text';
import Image from 'components/image';
import Icon from 'components/icon';
import Button from 'components/button';
import TextSlider from 'components/textSlider';

@connect(state => ({
    eventPageAsyncData: state
        .event
        .get('eventPageAsyncData'),
    eventPageAsyncError: state
        .event
        .get('eventPageAsyncError'),
    eventPageAsyncLoading: state
        .event
        .get('eventPageAsyncLoading')
}))
export default class Event extends Component {
    static propTypes = {
        eventPageAsyncData: PropTypes.object,
        eventPageAsyncError: PropTypes.object,
        eventPageAsyncLoading: PropTypes.bool,
        // from react-redux connect
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.goTo = this
            .goTo
            .bind(this);
        this.openDropDown = this
            .openDropDown
            .bind(this);
    }
    componentWillMount() {
        const {dispatch, match} = this.props;

        dispatch(getEventPage(match.params.id));
    }
    componentDidMount() {
        $('.modal').modal();
        $('.collapsible').collapsible();
    }
    goTo(url) {
        window.open(url)
    }
    openDropDown() {
        $('#salersModal').modal('open');
    }
    render() {
        const {eventPageAsyncData, eventPageAsyncError, eventPageAsyncLoading} = this.props;

        let titleImage = {
            full: 'url',
            crop: 'url'
        }
        let texts = [];
        let title = 'Title';
        let subTitle = 'subTitle';
        let buttons = [];
        let eventDate = new Date();
        let address = "Место проведения";

        if (eventPageAsyncData) {
            titleImage = eventPageAsyncData.TitleImage;
            title = eventPageAsyncData.Title;
            texts = eventPageAsyncData.Text;
            subTitle = eventPageAsyncData.SubTitle;
            buttons = eventPageAsyncData.Button;
            eventDate = eventPageAsyncData.EventDate;
            address = eventPageAsyncData.Address;
        }
        var date = {
            year: 'short',
            month: 'short',
            day: 'short'
        };
        var time = {
            hour: 'numeric',
            minute: 'numeric'
        };

        return (
            <div className='EventPage row'>
                <div className='col l6'>
                    <Image className='col l12' src={titleImage.Full}/>
                    <div className='col l12 EventPage__info'>
                        <div className='col s7 offset-s1 l3'>
                            <Text type='EventPage__helptext bolder'>Дата проведения</Text>
                            <Text type='EventPage__maintext'>{eventDate.toLocaleDateString("ru-RU")}</Text>
                        </div>
                        <div className='col s4 l3'>
                            <Text type='EventPage__helptext bolder'>Время</Text>
                            <Text type='EventPage__maintext'>{eventDate.toLocaleTimeString("ru-RU", time)}</Text>
                        </div>
                        <div className='col s11 offset-s1 l3'>
                            <Text type='EventPage__helptext bolder'>Место проведения</Text>
                            <Text type='EventPage__maintext'>{address}</Text>
                        </div>
                        <div className='col s8 offset-s2 l3'>
                            <Text type='EventPage__helptext bolder'>&nbsp;</Text>
                            <Button
                                onClick={() => {
                                this.openDropDown()
                            }}
                                text='Купить билет'
                                data='salersModal'
                                className='modal-trigger Button--fw'/>
                            <div id="salersModal" className="modal bottom-sheet">
                                <div className="modal-header">
                                    <Text type='header center'>
                                        Выберете продавца
                                    </Text>
                                </div>
                                <div className="modal-content">
                                    <div className='row'>
                                        {buttons.map((button, i) => {
                                            return <div key={i} className='col'>
                                                <Button
                                                    onClick={() => {
                                                    this.goTo(button.Url)
                                                }}><Image src={button.img} alt={button.Name}/></Button>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col l6 EventPage__maincontent'>
                    <Text type='header bold EventPage__title'>
                        «{title}»
                    </Text>
                    <Text type='bold'>
                        {subTitle}
                    </Text>
                    <div className='col s12 EventPage__maintext'>
                        <TextSlider texts={texts}
                        responsive={[
                            {
                              breakpoint: 763,
                              settings: 
                                'unslick'
                            }
                          ]}
                        />
                    </div>
                </div>
            </div>
        );
    }
}