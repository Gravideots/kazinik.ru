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
      <div className='Comment'>
          <div className="card">
            <div className="card-content">
              <div className='Comment__info'>
                <div className='Comment__infoItem'>
                    <Text type='footnote'>Имя:&nbsp;</Text>
                    <Text type='footnote bold'>{data.Username}</Text>
                </div>
                <div className='Comment__infoItem'>
                    <Text type='footnote'>Дата:&nbsp;</Text>
                    <Text type='footnote bold'>{data.Date.toLocaleString('ru')}</Text>
                </div>
              </div>
              <p className='maintext'>{data.Message}</p>
            </div>
          </div>
      </div>
    );
  }
}