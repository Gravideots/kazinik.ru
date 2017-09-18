import React, { Component } from 'react';

export default class Text extends Component {
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