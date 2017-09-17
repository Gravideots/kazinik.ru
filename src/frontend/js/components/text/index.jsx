import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Text extends Component {
    static propTypes = {
        children: PropTypes.string,
    }
    render() {
        const {
            type,
            children
        } = this.props;

        return (
            <div className='Text'>
                <p className={ type? type:'main'}>
                    {children}
                </p>
            </div>
        );
    }
}

//Usage
// <Text type='header'>Михаил Казиник</Text>