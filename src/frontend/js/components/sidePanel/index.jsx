import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
    showSidebar: state.main.get('toggleSidebar'),
}))

export default class SidePanel extends Component {
    render() {
        let sidebar =
            <ul >
                <li><a href="#!">First Link With Icon</a></li>
                <li><a href="#!">Second Link</a></li>
                <li><div className="divider"></div></li>
                <li>Subheader</li>
                <li>hird Link With Waves</li>
            </ul >
        return sidebar
    }
}