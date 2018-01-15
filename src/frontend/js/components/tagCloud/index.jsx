import React, {Component} from 'react';

import Button from 'components/button';

export default class TagsCloud extends Component {
  render() {
    const {
      tags,
      selected
    } = this.props;

    if( !tags ) return null;

    return (
      <div className='TagsCloud'>
        {tags.map((tag, key)=>{
          return(
            <Button key={key}  onClick={()=>{this.props.click(tag.URL)}}>
              <div className={(selected === tag.URL)?'chip active': 'chip'}>{tag.Text}</div>
            </Button>
          )
        })}
      </div>
    )
  }
}