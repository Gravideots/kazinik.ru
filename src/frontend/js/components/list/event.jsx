import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from 'config/routes';

import Slide from 'components/slide';

export default class EventListElement extends Component {
	render() {
		const {data} = this.props;

		return (
			<div className='EventListElement col l6'>
				<Link to={{pathname: routeCodes['EVENT'] + data.URL}}>
					<Slide data={data}/>
				</Link>
			</div>
		);
	}
}
