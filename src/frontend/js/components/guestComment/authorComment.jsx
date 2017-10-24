import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from 'config/routes';

import Text from 'components/text';
import Image from 'components/image';
import Button from 'components/button';

export default class Comment extends Component {
  render() {
    const {data} = this.props;

    return(
      <div className='Comment row'>
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <div className='row'>
                <div className='col s2'>
                  <Image src='https://avatars.mds.yandex.net/get-afishanew/23222/968bfc7595947f59cbbe132035e09ced/orig' alt='html54'/>
                </div>
                <div className='col s4'>
                  <div className='col s3'>
                    <Text type='footnote'>Имя:</Text>
                  </div>
                  <div className='valign-wrapper col s9'>
                    <Text type='footnote bold'>Михаил Казиник</Text>
                  </div>
                </div>
                <div className='col s4'>
                  <div className='col s3'>
                    <Text type='footnote'>Дата:</Text>
                  </div>
                  <div className='col s9'>
                    <Text type='footnote bold'>27,06,1992</Text>
                  </div>
                </div>
              </div>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}