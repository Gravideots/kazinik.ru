import React, {Component} from 'react';

import Button from 'components/button';

export default class TagsCloud extends Component {
  render() {
    const {
      tags,
      selected
    } = this.props;

    return (
      <div className='TagsCloud center row'>
        {tags.map((tag, key)=>{
          return(
            <div key={key} className='col s1'>
              <Button  onClick={()=>{this.props.click(tag.Text)}}>
                <div className={(selected === tag.Text)?'chip active': 'chip'}>{tag.Text}</div>
              </Button>
            </div>
          )
        })}
      </div>
    )
  }

}