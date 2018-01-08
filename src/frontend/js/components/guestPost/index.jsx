import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from 'config/routes';

import Text from 'components/text';
import Image from 'components/image';
import Button from 'components/button';

export default class GuestPost extends Component {
  constructor(){
    super()

    this.requestModal = 
      this.requestModal
      .bind(this);
  }

  requestModal(e){
    const {
      data,
      action
    } = this.props;

    if(action && data)
      action(e, data.ID)
  }

  render() {
    const {data} = this.props;

    return(
      <div className='GuestPost'>
        <div className="">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <div className='row'>
                  <div className='col s12 m4'>
                    <div className='col s6 m5 l5'>
                      <Text type='footnote'>Сообщение №</Text>
                    </div>
                    <div className='col s6 m7 l7'>
                      <Text type='footnote bold'>{data.ID}</Text>
                    </div>
                  </div>
                  <div className='col s12 m4'>
                    <div className='col s4 m3 l3'>
                      <Text type='footnote'>Имя:</Text>
                    </div>
                    <div className='col s8 m9 l9'>
                      <Text type='footnote bold'>{data.Username}</Text>
                    </div>
                  </div>
                  <div className='col s12 m4'>
                    <div className='col s3 m3 l3'>
                      <Text type='footnote'>Дата:</Text>
                    </div>
                    <div className='col s9 m9 l9'>
                      <Text type='footnote bold'>{data.Date.toLocaleString('ru')}</Text>
                    </div>
                  </div>
                </div>
                <p className='maintext'>{data.Message}</p>
              </div>
              <div className="card-action">
                  <Button text='Ответить' onClick={this.requestModal}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}