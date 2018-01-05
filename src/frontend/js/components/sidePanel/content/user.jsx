import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { routeCodes } from 'config/routes';

import Button from 'components/button';
import Text from 'components/text';

export default class SidebarUserContent extends Component {

  static propTypes = {
      title: PropTypes.string,
      fixed: PropTypes.bool,
      paths: PropTypes.array,
      dispatch: PropTypes.func
  }

  constructor(props) {
      super(props)
  }

  render() {
      let {fixed, title, paths} = this.props;
      if (!fixed) 
          return (
              <div>
                  <div className='right-align'>
                      <i className='close small material-icons col s12 l12 m12'>
                          close
                      </i>
                  </div>
                  <p className="col s12 l12 m12 center-align">
                      {this.props.title || 'Заглушка'}
                  </p>
                  <div>
                      { paths.map( ( path, key ) => {

                        return(
                          <Link className='SideMenuLinks'
                            key = { key }
                            to={{pathname: (path.Listed)? routeCodes['SECTION'] + path.URL : routeCodes[ path.URL ] }}>
                              <div>
                                  <Text type='main'>{ path.Title }</Text>
                              </div>
                          </Link>
                        )
                      })}
                  </div>
              </div>
          )
  }
}