import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';

export default class Button extends Component {
    static propTypes = {
    	children: PropTypes.object
    }

    constructor(props) {
    	super(props);

    	this.click = this
    		.click
    		.bind(this);
    }

    click(event) {
    	this
    		.props
    		.onClick(event);
    }

    render() {
    	const {children, text, data, className, icon} = this.props;

    	let content = <button
    		data-target={data}
    		className={'btn waves-effect waves-light black' + (className !== undefined
    			? ' ' + className
    			: '')}>
    		{icon ? <Icon iconName={icon}/> : ''}
    		{text}
    	</button>;

    	if (children)
    		content = children;

    	return (
    		<div className='Button' onClick={this.click}>
    			{content}
    		</div>
    	);
    }
}

// Usage <Button onClick={ this.handleTestButtonClick }>     <Icon
// iconName={"alarm"} size='medium'/>  </Button> or <Button onClick={
// this.handleTestButtonClick } text='Button'/>
