import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    const {data, action} = this.props;

    return(
      <div className='Footer'>
        <p className='Footer__text'>© Михаил Казиник, 2018 Сделано в HIG&Gravideots</p>
      </div>
    );
  }
}