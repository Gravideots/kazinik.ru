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
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={() => console.log('onPlay')}
            onPause={() => console.log('onPause')}
            onBuffer={() => console.log('onBuffer')}
            onSeek={e => console.log('onSeek', e)}
            onEnded={() => console.log('onEnded')}
            onError={e => console.log('onError', e)}
            onProgress={() => console.log('onProgress')}
            onDuration={duration => console.log('onDuration', duration)}
          />
        </div>
      )
    else
      return null;
  }
}