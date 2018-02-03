import React, { Component } from 'react';

import Icon from '../icon';

export default class TextArea extends Component {
	constructor(props) {
		super(props);
		this.state = {value: props.val ? props.val : ''};

		this.handleChange = this.handleChange.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentDidMount() {
		const name = this.props.name;

		if (name) {
			// $('.' + name).tooltip();
		}
	}

	handleChange(event) {
		this.setState({value: event.target.value});
		this.props.onChange(event.target.value);
	}

	reset() {
		this.setState({value: ''});
	}

	showRequiredTooltip() {
		let name = this.props.name;
		if (name) {
			$('.' + name).tooltip().trigger('mouseenter');
			setTimeout(function() { $('.' + name).trigger('mouseleave'); }, 3000);
		}
	}

	render() {
		const {
			placeholder,
			className,
			name,
			tooltipPosition,
			rows
		} = this.props;

		let areaName = name || '';
		let position = tooltipPosition || 'bottom';

		return (
			<div className={ className ? 'TextArea Input' + className : 'TextArea Input'}>
				<textarea className={'materialize-textarea ' + areaName} placeholder={placeholder} data-position={position} data-tooltip='Обязательное поле' value={this.state.value} onChange={this.handleChange} rows={ rows || 6}/>
			</div>
		);
	}
}
