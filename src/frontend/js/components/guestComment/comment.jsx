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
        <div className="col s12 m12">
          <div className="card">
            <div className="card-content">
              <div className='row'>
                <div className='col l6'>
                  <div className='col l2'>
                    <Text type='footnote'>Имя:</Text>
                  </div>
                  <div className='col l10'>
                    <Text type='footnote bold'>{data.Username}</Text>
                  </div>
                </div>
                <div className='col l6'>
                  <div className='col l2'>
                    <Text type='footnote'>Дата:</Text>
                  </div>
                  <div className='col l6'>
                    <Text type='footnote bold'>{data.Date.toLocaleString('ru')}</Text>
                  </div>
                </div>
              </div>
              <p className='maintext'>{data.Message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}