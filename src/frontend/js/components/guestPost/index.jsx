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
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <div className='GuestPost__info'>
                  <div className='GuestPost__infoItem GuestPost__number'>
                      <Text type='footnote'>Сообщение №</Text>
                      <Text type='footnote bold'>{data.ID}</Text>
                  </div>
                  <div className='GuestPost__infoItem GuestPost__name'>
                      <Text type='footnote'>Имя:&nbsp;</Text>
                      <Text type='footnote bold'>{data.Username}</Text>
                  </div>
                  <div className='GuestPost__infoItem GuestPost__date'>
                      <Text type='footnote'>Дата:&nbsp;</Text>
                      <Text type='footnote bold'>{data.Date.toLocaleString('ru')}</Text>
                  </div>
                </div>
                <div className='GuestPost__question'>
                    <p className='maintext'>{data.Message}</p>
                </div>
              </div>
              <div className="card-action">
                  <Button text='Ответить' onClick={this.requestModal}/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}