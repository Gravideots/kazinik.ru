import React from 'react';

export default (props) => (
    <i className={'material-icons' + (props.size !== undefined? ' '+props.size : '') }>{props.iconName}</i>
);
