import React, { Component } from 'react';

import SectionBlock from 'components/sectionBlock';

export default class Sections extends Component {

  render() {
    const {
        sections
    } = this.props;

    if(!sections)
        return null;

    return (
        <div className='Sections row'>
            { sections.map( ( section, key ) => {
                return <SectionBlock key={key} sectionsData={section}/>
            })}
        </div>
    );
  }
}