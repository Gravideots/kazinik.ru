import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SectionBlock from 'components/sectionBlock';

export default class Sections extends Component {
    static propTypes = {
        sections: PropTypes.array
    }
    render() {
        const {sections} = this.props;

        if (!sections)
            return null;

        return (
            <div className='Sections'>
                {sections.map((section, key) => {
                    return <SectionBlock key={key} sectionsData={section}/>
                })}
            </div>
        );
    }
}