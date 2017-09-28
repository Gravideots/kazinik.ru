import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
    showSidebar: state.main.get('toggleSidebar'),
}))

export default class SidePanel extends Component {
    render() {
        let sidebar =
            <ul >
                <li><a href="#!">First Link</a></li>
                <li><a href="#!">Second Link</a></li>
                <li>Third link</li>
                <li>Fourth link</li>
            </ul >
        return sidebar
    }
}