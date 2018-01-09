import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { toggleSidebar, getSidebarContent, getExistingSections, getNavigation } from './actions.js';

import SidebarUserContent from './content/user'
import SidebarAdminContent from './content/admin'

import FeedbackForm from 'components/feedbackForm'

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
        .get('userData'),
    contentAdmin: state
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
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {adminPageLoaded, show, openFromRight, content, contentAdmin, dispatch} = this.props;

        if (adminPageLoaded)
            return (
                <AdminSidebar
                    adminPageLoaded={adminPageLoaded}
                    dispatch={dispatch}
                    content={contentAdmin}
                />
            )
        else 
            return <UserSidebar show={show} openFromRight={openFromRight} dispatch={dispatch} content={content}/>
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

    
    componentWillMount() {
        let { dispatch } = this.props
        dispatch(getExistingSections())
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
                <div className='SidebarAdminContent Left '>
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
        content: PropTypes.array,
        contentAdmin: PropTypes.object,

        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)

        this.toggleSidebar = this
            .toggleSidebar
            .bind(this);
    }

        
    componentWillMount() {
        let { dispatch } = this.props
        dispatch(getNavigation())
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
        let { show, openFromRight, content } = this.props;

        if( !content ) return null;

        return (
            <div className='Sidebar' style={styles.root}>
                <div
                    className='PageOverlay'
                    style={styles.overlay}
                    onClick={() => this.toggleSidebar(openFromRight)}></div>
                <div
                    className='SideNavContent Left'
                    style={styles.navLeft}>
                    <SidebarUserContent title='Михаил Казиник' paths={ content } close={() => this.toggleSidebar(openFromRight)}/>
                </div>
                <div
                    className='SideNavContent Right'
                    style={styles.navRight}>
                    <FeedbackForm close={() => this.toggleSidebar(openFromRight)}/>
                </div>
            </div>
        )
    }
}