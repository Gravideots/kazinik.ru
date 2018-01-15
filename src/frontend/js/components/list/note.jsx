import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from 'config/routes';

import Text from 'components/text';
import Image from 'components/image';
import Button from 'components/button';

export default class NoteListElement extends Component {
  render() {
    const {data, type} = this.props;
    
    if( !data ) return null;

    return(
      <div className='NoteListElement row'>
        <div className='col s12 m4'>
          <Text>{data.Author + " " + ( data.Date ? data.Date.toLocaleDateString('ru-RU') : "" ) } </Text>
          <Image src={ data.TitleImage? data.TitleImage.Crop? data.TitleImage.Crop : data.TitleImage.Full? data.TitleImage.Full: '' : '' }/>
          <Text type='helptext'>{ data.SubTitle? data.SubTitle.slice(0, 400) + '...' : '' }</Text>
        </div>
        <div className='col s12 m8'>
            <Text type='subheader bold'>«{data.Title}»</Text>
            <Text type='helptext'>{data.Description.slice(0, 900) + '...'}</Text>
            <Link className='col s12 m3'
            to={{ pathname: routeCodes.NOTE + data.Id, data }}>
                <Button text='Читать далее >>>' onClick={()=>console.log('Go to ' + data.Id)}/>
            </Link>
        </div>
      </div>
    );
  }
}