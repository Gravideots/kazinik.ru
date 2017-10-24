import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from 'config/routes';

import Text from 'components/text';
import Image from 'components/image';
import Button from 'components/button';

export default class GuestPost extends Component {
  render() {
    const {data} = this.props;

    return(
      <div className='GuestPost'>
        <div className="">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <div className='row'>
                  <div className='col s4'>
                    <div className='col s5'>
                      <Text type='footnote'>Сообщение №</Text>
                    </div>
                    <div className='col s7'>
                      <Text type='footnote bold'>6546546</Text>
                    </div>
                  </div>
                  <div className='col s4'>
                    <div className='col s3'>
                      <Text type='footnote'>Имя:</Text>
                    </div>
                    <div className='col s9'>
                      <Text type='footnote bold'>Алиса</Text>
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
              <div className="card-action">
                  <Button text='Ответить'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}