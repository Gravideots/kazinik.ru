import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';

import Input from '../input'
import Logo from '../logo'
import Icon from '../icon'
import Button from '../button'
import Text from '../text'

export default class Navbar extends Component {
  render() {
    return (
        <nav className="Navbar nav-extended">
            <div className="nav-wrapper">
                <div className="row">
                    <div className="col" >
                        <Button onClick={console.log}>
                            <Icon iconName={'menu'} size='small'/>
                        </Button>
                    </div>
                    <div className="col l9 xl11 hide-on-med-and-down">
                        <NavLink
                            activeClassName='Menu-link--active'
                            className='Menu-link'
                            exact
                            to={ routeCodes.Main }
                        >
                            <div className="col"><Logo text='Михаил Казиник'/></div>
                        </NavLink>
                        <div className="col l3 xl2"><Input placeholder='Поиск' type='text' iconName='search' onChange={this.handleChange}/></div>
                        <div className="col">
                            <div className="col">
                                <Text type='footnote' >
                                    Контакты
                                </Text>
                            </div>
                            <div className="col">
                                <Text type='footnote' >
                                    <a href="mailto:youremailaddress">mikhail@kazinik.com</a> 
                                </Text>
                            </div>
                        </div>
                        <div className="col">
                            <div className="col">
                                <Text type='footnote' >
                                    <a href="http://vk.com"><Icon iconName={'code'} size='tiny'/></a> 
                                </Text>
                            </div>
                            <div className="col">
                                <Text type='footnote' >
                                    <a href="http://fb.com"><Icon iconName={'class'} size='tiny'/></a> 
                                </Text>
                            </div>
                            <div className="col">
                                <Text type='footnote' >
                                    <a href="http://youtube.com"><Icon iconName={'report'} size='tiny'/></a> 
                                </Text>
                            </div>
                        </div>
                        <div className="col"><Button onClick={console.log} text='Форма обратной связи'/></div>
                    </div>
                </div>
                <ul className="side-nav" id="mobile-demo">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </nav>
    );
  }
}