import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';

import Input from '../input'
import Logo from '../logo'
import Icon from '../icon'
import Button from '../button'
import Text from '../text'

import { toggleSidebar } from './actions.js';

@connect()
export default class Navbar extends Component {

    toggleSidebar(openFromRight) {
        const {dispatch} = this.props
        dispatch(toggleSidebar(openFromRight));
    }
    
    render() {
        const { location, history } = this.props;
        if( location.pathname === '/admin' ) return null;
        return (
            <div className="navbar-fixed">
                <nav className="Navbar nav-extended">
                    <div className="nav-wrapper">
                        <Button onClick={() => this.toggleSidebar(false)}>
                            <Icon iconName={'menu'} size='small'/>
                        </Button>
                        <div className="col l9 xl11 hide-on-med-and-down Navbar__content">
                            <NavLink
                                activeClassName='Menu-link--active'
                                className='Menu-link'
                                exact
                                to={routeCodes.Main}>
                                <Logo text='Михаил Казиник'/>
                            </NavLink>
                            <div className="Navbar__search SearchInput">
                                <Input
                                    placeholder='Поиск'
                                    type='text'
                                    iconName='search'
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <Text type='footnote'>
                                    <a className='Navbar__link' href="#">Контакты</a>
                                </Text>
                            </div>
                            <div>
                                <Text type='footnote'>
                                    <a className='Navbar__link' href="mailto:youremailaddress">mikhail@kazinik.com</a>
                                </Text>
                            </div>
                            <div className='Navbar__social socialicon'>
                                <a className='socialicon__item' target='_blank' href="http://vk.com">
                                    <img className='socialicon__image' src='/assets/img/icons/vk.svg'/>
                                </a>
                                <a className='socialicon__item' target='_blank' href="http://fb.com">
                                    <img className='socialicon__image' src='/assets/img/icons/facebook-f.svg'/>
                                </a>
                                <a className='socialicon__item' target='_blank' href="http://youtube.com">
                                    <img className='socialicon__image' src='/assets/img/icons/youtube.svg'/>
                                </a>
                            </div>
                            <Button onClick={() => this.toggleSidebar(true)} text='Форма обратной связи'/>
                        </div>
                        <div className='mobileNav '>
                            <Button onClick={() => this.toggleSidebar(true)} text='Связаться'/>
                            {
                                (location.pathname === '/')?
                                <div className='socialicon'>
                                    <a className='socialicon__item' target='_blank' href="http://vk.com">
                                        <img className='socialicon__image' src='/assets/img/icons/vk.svg'/>
                                    </a>
                                    <a className='socialicon__item' target='_blank' href="http://fb.com">
                                        <img className='socialicon__image' src='/assets/img/icons/facebook-f.svg'/>
                                    </a>
                                    <a className='socialicon__item' target='_blank' href="http://youtube.com">
                                        <img className='socialicon__image' src='/assets/img/icons/youtube.svg'/>
                                    </a>
                                </div>
                                :
                                <Button onClick={() => history.goBack()}>
                                    <div className='socialicon'>
                                        <a className='socialicon__item socialicon__item--arrow'>
                                            <img className='socialicon__image' src='/assets/img/icons/arrow.svg'/>
                                        </a>
                                    </div>
                                </Button>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}