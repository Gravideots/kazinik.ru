import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom';
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
      let {fixed, title, paths, close} = this.props;
      if (!fixed) 
          return (
              <div>
                  <div className='left-align'>
                      <Button onClick={close}>
                        <i className='close small material-icons col s12 l12 m12'>
                            close
                        </i>
                      </Button>
                  </div>
                  <p className="col s12 l12 m12 center-align Sidebar__title">
                    <NavLink
                        onClick={close}
                        to={routeCodes.Main}>
                        <div>
                            <Text type='header '>{ this.props.title || 'На главную' }</Text>
                        </div>
                    </NavLink>
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
                  <div className='socialicon'>
                    <a className='socialicon__item' href="http://vk.com">
                        <img className='socialicon__image' src='/assets/img/icons/vk.svg'/>
                    </a>
                    <a className='socialicon__item' href="http://fb.com">
                        <img className='socialicon__image' src='/assets/img/icons/facebook-f.svg'/>
                    </a>
                    <a className='socialicon__item' href="http://youtube.com">
                        <img className='socialicon__image' src='/assets/img/icons/youtube.svg'/>
                    </a>
                </div>
              </div>
          )
  }
}