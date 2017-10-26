import React, {Component} from 'react';

import Button from 'components/button';
import NoteListElement from './note';
import MediaListElement from './media';
import EventListElement from './event';
import SchoolListElement from './school';
import GuestBook from 'components/guestBook';

export default class List extends Component {
  render() {
    const {listData, type, action} = this.props;

    if (listData && type) {
      switch (type) {
        case 'Media':
          return (
            <div className='List row'>
              {listData.map((listElement, key) => {
                return (
                  <div className='col l6'>
                    <MediaListElement key={key} data={listElement}/>
                  </div>
                );
              })}
            </div>
          );
          break;
        case 'Notes':
          return (
            <div className='List'>
              {listData.map((listElement, key) => {
                return <NoteListElement key={key} data={listElement}/>
              })}
            </div>
          );
          break;
        case 'Special':
        case 'Event':
          return (
            <div className='List row'>
              {listData.map((listElement, key) => {
                return <EventListElement key={key} data={listElement}/>
              })}
            </div>
          );
          break;
        case 'School':
          return (
            <div className='List row'>
              {listData.map((listElement, key) => {
                return <SchoolListElement key={key} data={listElement}/>
              })}
            </div>
          );
          break;
        case 'Guest':
          return (
            <div className='List row'>
              {listData.map((listElement, key) => {
                return <GuestBook key={key} data={listElement} action={action}/>
              })}
            </div>
          );
          break;
        default:
          return null;
      }
    } else 
      return null;
    }
  
}