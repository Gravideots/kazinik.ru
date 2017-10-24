import React, {Component} from 'react';

import GuestPost from 'components/guestPost';
import GuestComment from 'components/guestComment';

export default class GuestBook extends Component {
  render() {
    const {data} = this.props;

    return(
      <div className='GuestBook'>
          <GuestPost/>
          <GuestComment data={data}/>
      </div>
    );
  }
}