import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {toggleSidebar, getSidebarContent, getExistingSectios} from './actions.js';
import {getPossibleSectiosList} from '../../pages/admin/actions.js';

import FeedbackForm from '../feedbackForm'
import Button from '../button';

@connect(state => ({
    show: state
        .sidepanel
        .get('show'),
    openFromRight: state
        .sidepanel
        .get('openFromRight'),
    adminPageLoaded: state
        .admin
        .get('asyncLoaded'),
    content: state
        .sidepanel
        .get('asyncData'),
    SidebarAsyncError: state
        .event
        .get('SidebarAsyncError'),
    SidebarAsyncLoading: state
        .event
        .get('SidebarAsyncLoading')
}))

export default class Sidebar extends Component {

    static propTypes = {
        fixed: PropTypes.bool,
        adminPageLoaded: PropTypes.bool,
        show: PropTypes.bool,
        openFromRight: PropTypes.bool,
        content: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        let {dispatch} = this.props
        dispatch(getExistingSectios())
    }

    render() {
        let {adminPageLoaded, show, openFromRight, content, dispatch} = this.props;

        if (adminPageLoaded) 
            return <AdminSidebar
                adminPageLoaded={adminPageLoaded}
                dispatch={dispatch}
                content={content}/>
        else 
            return <UserSidebar show={show} openFromRight={openFromRight} dispatch={dispatch}/>
    }
}

class AdminSidebar extends Component {

    static propTypes = {
        fixed: PropTypes.bool,
        adminPageLoaded: PropTypes.bool,
        show: PropTypes.bool,
        openFromRight: PropTypes.bool,
        content: PropTypes.object,

        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    getExistingSectios() {
        const {dispatch} = this.props
        dispatch(getExistingSectios());
    }

    render() {

        let {adminPageLoaded, show, openFromRight, content, dispatch} = this.props;
        return (
            <div className='Sidebar SidebarAdmin'>
                < div className='SidebarAdminContent Left '>
                    <SidebarAdminContent
                        title='Управление'
                        fixed={true}
                        content={content}
                        dispatch={dispatch}/>
                </div>
            </div>
        )
    }
}

class UserSidebar extends Component {

    static propTypes = {
        fixed: PropTypes.bool,
        show: PropTypes.bool,
        openFromRight: PropTypes.bool,
        content: PropTypes.string,

        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)

        this.toggleSidebar = this
            .toggleSidebar
            .bind(this);
    }

    toggleSidebar(openFromRight) {
        const {dispatch} = this.props
        dispatch(toggleSidebar(openFromRight));
    }

    getStyle() {
        let {show, openFromRight} = this.props;

        let styles = {
            root: {
                pointerEvents: show
                    ? 'auto'
                    : 'none'
            },
            navLeft: {
                transform: (show && !openFromRight)
                    ? 'none'
                    : 'translateX(-102%)'
            },
            navRight: {
                transform: (show && openFromRight)
                    ? 'none'
                    : 'translateX(102%)'
            },
            overlay: {
                opacity: show
                    ? 1
                    : 0
            }
        };
        return styles;
    }

    render() {
        let styles = this.getStyle();
        let {show, openFromRight} = this.props;
        return (
            <div className='Sidebar' style={styles.root}>
                <div
                    className='PageOverlay'
                    style={styles.overlay}
                    onClick=
                    {() => this.toggleSidebar(openFromRight)}></div>
                <div
                    className='SideNavContent Left'
                    style={styles.navLeft}
                    onClick=
                    {() => this.toggleSidebar(openFromRight)}>
                    < SidebarUserContent title='Разделы'/>
                </div>
                <div
                    className='SideNavContent Right'
                    style={styles.navRight}
                    onClick=
                    {() => this.toggleSidebar(this.props.openFromRight)}>
                    <FeedbackForm/>
                </div>
            </div>
        )
    }
}

class SidebarUserContent extends Component {

    static propTypes = {
        title: PropTypes.string,
        fixed: PropTypes.bool,
        content: PropTypes.arrayOf(PropTypes.node),
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {fixed, title} = this.props;
        if (!fixed) 
            return (
                <div>
                    <div className={'right-align'}>
                        <i className={'close small material-icons col s12 l12 m12'}>
                            close
                        </i>
                    </div>
                    <p className="col s12 l12 m12 center-align">
                        {this.props.title || 'Заглушка'}
                    </p>
                    <div >
                        <Button text='Test Button' data='modal1' className='modal-trigger'/>
                    </div>
                </div >
            )
    }
}

class SidebarAdminContent extends Component {

    static propTypes = {
        title: PropTypes.string,
        fixed: PropTypes.bool,
        content: PropTypes.object,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    getPossibleSectios() {
        const {dispatch} = this.props
        dispatch(getPossibleSectiosList());
    }

    render() {
        let {title, content} = this.props;

        let ExistingSections
        if (content && content.ExistingSections) {
            ExistingSections = (content.ExistingSections.map(function (element, i) {
                return < Button text = {
                    element.Title
                }
                key = {
                    i
                } />
        }, this))
    }

    return (
        <div>
            <div className='Title'>
                <h5>
                    {this.props.title || 'Заглушка'}
                </h5>
            </div>
            <div>
                <Button
                    onClick={() => {
                    this.getPossibleSectios()
                }}
                    text='Добавить раздел'/> {ExistingSections}
            </div>
        </div>
    )
}
}
