import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { routeCodes } from 'config/routes';

import Image from '../image';
import Text from '../text';

export default class SectionBlock extends Component {

  render() {
    const {
        sectionsData
    } = this.props;

    return (
        <Link to={{
            pathname: routeCodes[sectionsData.URL]
        }}>
            <div className='SectionBlock col'>
                <Image src={sectionsData.BackgroundImage} alt={sectionsData.Title}/>
                <Image src={sectionsData.Icon} alt={sectionsData.Title}/>
                <Text type='main'>{sectionsData.Title}</Text>
            </div>
        </Link>
    );
  }
}