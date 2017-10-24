import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from 'config/routes';

import Text from 'components/text';
import Image from 'components/image';
import Button from 'components/button';

import Comment from './comment';
import AuthorComment from './authorComment';

export default class GuestComment extends Component {
  componentDidMount() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  };

  render() {
    const {data} = this.props;

    if(data.comments)
      return(
        <div className='GuestComment'>
          <ul className="collapsible" data-collapsible="accordion">
            <li>
              <div className="collapsible-header"><i className="material-icons">chat_bubble_outline</i>Коментарии {data.comments.length}</div>
              <div className="collapsible-body">
                {data.comments.map((coment, i)=> {
                    if(coment.imgUrl)
                      return <AuthorComment key={i}/>
                    else
                      return <Comment key={i}/>
                  })
                }
              </div>
            </li>
          </ul>
        </div>
      );
    else return null;
  }
}