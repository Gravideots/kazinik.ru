import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from 'config/routes';

import Text from 'components/text';
import Image from 'components/image';
import Button from 'components/button';

export default class NoteListElement extends Component {
  render() {
    const {data, type} = this.props;

    return(
      <div className='NoteListElement row'>
        <div className='col s4'>
          <Text>{data.Author + " " + data.Date.toLocaleString('ru-RU')}</Text>
          <Image src={data.TitleImage.Crop}/>
          <Text type='footnote'>{data.SubTitle.slice(0, 400) + '...'}</Text>
        </div>
        <div className='col s8'>
            <Text type='subheader bold'>«{data.Title}»</Text>
            <Text type='footnote'>{data.Description.slice(0, 900) + '...'}</Text>
            <Link className='col s3'
            to={{ pathname: routeCodes.NOTE + data.Id, data }}>
                <Button text='Читать далее >>>'/>
            </Link>
        </div>
      </div>
    );
  }
}