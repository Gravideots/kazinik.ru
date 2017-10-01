import React, {Component} from 'react';

import Button from 'components/button';
import NoteListElement from './note';
import MediaListElement from './media';

export default class List extends Component {
  render() {
    const {listData, type} = this.props;

    if(listData){
      if (type == 'Media')
        return (
          <div className='List'>
            {listData.map((listElement, key) => {
              return <MediaListElement key={key} data={listElement}/>
            })}
          </div>
        )
      else
        return (
          <div className='List'>
            {listData.map((listElement, key) => {
              console.log(listElement)
              return <NoteListElement key={key} data={listElement}/>
            })}
          </div>
        )
    }

    else return null;
  }

}