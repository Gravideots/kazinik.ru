import React, {Component} from 'react';

import Button from 'components/button';
import NoteListElement from './note';
import MediaListElement from './media';
import EventListElement from './event';
import SchoolListElement from './school';

export default class List extends Component {
  render() {
    const {listData, type} = this.props;

    if(listData && type){
      switch(type){
        case 'Media': 
          return (
            <div className='List row'>
              {listData.map((listElement, key) => {
                return <MediaListElement key={key} data={listElement}/>
              })}
            </div>
          )
        break;
        case 'Notes': 
          return (
            <div className='List'>
              {listData.map((listElement, key) => {
                return <NoteListElement key={key} data={listElement}/>
              })}
            </div>
          )
        break;
        case 'Special':
        case 'Event':
          return (
            <div className='List row'>
              {listData.map((listElement, key) => {
                return <EventListElement key={key} data={listElement}/>
              })}
            </div>
          )
        break;
        case 'School':
        return (
          <div className='List row'>
            {listData.map((listElement, key) => {
              return <SchoolListElement key={key} data={listElement}/>
            })}
          </div>
        )
        break;
        default: return null;
      }
    }
    else return null;
  }

}