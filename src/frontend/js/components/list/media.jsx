import React, {Component} from 'react';
import ReactPlayer from 'react-player'

import Button from 'components/button';

export default class MediaListElement extends Component {
  render() {
    const {data} = this.props;

    if(data !== undefined && data.Type === 'VIDEO')
      return(
        <div className='col l6'>
          <ReactPlayer
            url={data.URL}
            height='300px'
            width='100%'
            style={{marginTop:'1.5rem'}}
          />
        </div>
      )
    else
      return null;
  }
}