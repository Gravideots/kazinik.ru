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

    if(data)
      return(
        <div className='GuestComment'>
          <ul className="collapsible" data-collapsible="accordion">
            <li>
              <div className="collapsible-header"><i className="material-icons">chat_bubble_outline</i>Коментарии {data.length}</div>
              <div className="collapsible-body">
                {data.map((comment, i)=> {
                    if(comment.ShowImage)
                      return <AuthorComment key={i} data={comment}/>
                    else
                      return <Comment key={i} data={comment}/>
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