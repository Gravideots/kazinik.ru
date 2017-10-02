import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {toggleSidebar} from './actions.js';
import Text from '../text'

@connect(state => ({
    showNav: state
        .sidepanel
        .get('showNav')
}))

export default class SideNav extends Component {

    static propTypes = {
        style: PropTypes.object,
        navStyle: PropTypes.object,
        titleStyle: PropTypes.object,
        itemStyle: PropTypes.object,
        itemHoverStyle: PropTypes.object,
        title: PropTypes.node,
        children: PropTypes.node,
        items: PropTypes.arrayOf(PropTypes.node),
        showNav: PropTypes.bool,
        openFromRight: PropTypes.bool,
        onHideNav: PropTypes.func,
        onShowNav: PropTypes.func,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    toggleSidebar() {
        const {dispatch} = this.props
        dispatch(toggleSidebar());
    }

    getDefaultContent() {
        let styles = {
            title: {
                background: '#E91E63',
                color: '#fff',
                fontWeight: 400,
                margin: 0,
                lineHeight: '64px',
                padding: 22
            },
            li: {
                padding: 22,
                cursor: 'pointer',
                backgroundColor: '#fff'
            }
        };

        Object.assign(styles.li, this.props.itemStyle);
        Object.assign(styles.title, this.props.titleStyle);

        return (
            <div>
                <h2 style={styles.title}>{this.props.title || 'Михаил Казиник'}</h2>
                <ul>
                    {this.props.items
                        ? this
                            .props
                            .items
                            .map((item, key) => <li
                                key={'item' + key}
                                style={styles.li}
                                onMouseOver={(e) => handleItemHover(e, true)}
                                onMouseOut={(e) => handleItemHover(e, false)}>{item}</li>)
                        : <li key='item1' style={styles.li}>Item 1</li>
}
                </ul>
            </div>
        )
    }

    getStyle() {
        let {showNav} = this.props;
        let {openFromRight} = this.props;
        let styles = {
            root: {
                pointerEvents: showNav
                    ? 'auto'
                    : 'none'
            },
            nav: {
                transform: showNav
                    ? 'none'
                    : `translateX(${openFromRight
                        ? 102
                        : -102}%)`,
                float: openFromRight
                    ? 'right'
                    : 'left'
            },
            overlay: {
                opacity: 0
            }
        };

        Object.assign(styles.root, this.props.style);
        Object.assign(styles.nav, this.props.nav);
        return styles;
    }

    render() {
        let styles = this.getStyle();
        return (
            <div className='SideNav' style={styles.root} ref='aside'>
                <div
                    className='PageOverlay'
                    style={styles.overlay}
                    onClick={() => this.toggleSidebar()}
                    ref='overlay'></div>
                <div
                    className='SideNavContent'
                    style={styles.nav}
                    ref="nav"
                    onClick=
                    { () => this.toggleSidebar() }>
                    {this.props.children || this.getDefaultContent()}
                </div>
            </div>
        )
    }
}