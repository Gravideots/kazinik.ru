import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {routeCodes} from 'config/routes';

import Input from '../input'
import Logo from '../logo'
import Icon from '../icon'
import Button from '../button'
import Text from '../text'

import {connect} from 'react-redux';
import {toggleSidebar} from './actions.js';

@connect(state => ({}))

export default class Navbar extends Component {

    toggleSidebar(openFromRight) {
        const {dispatch} = this.props
        dispatch(toggleSidebar(openFromRight));
    }

    render() {
        return (
            <div className="navbar-fixed">
                <nav className="Navbar nav-extended">
                    <div className="nav-wrapper">


                            <Button onClick={() => this.toggleSidebar(false)}>
                                <Icon iconName={'menu'} size='small'/>
                            </Button>
                            <div className="col l9 xl11 hide-on-med-and-down">
                                <NavLink
                                    activeClassName='Menu-link--active'
                                    className='Menu-link'
                                    exact
                                    to={routeCodes.Main}>
                                    <Logo text='Михаил Казиник'/>
                                </NavLink>
                                <div className="SearchInput">
                                    <Input
                                        placeholder='Поиск'
                                        type='text'
                                        iconName='search'
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <Text type='footnote'>
                                        <a href="mailto:youremailaddress">mikhail@kazinik.com</a>
                                    </Text>
                                </div>
                                <div className="IconBlock">
                                    <div>
                                        <Text type='footnote'>
                                            <a href="http://vk.com">
                                                <Icon iconName={'code'} size='tiny'/>
                                            </a>
                                        </Text>
                                    </div>
                                    <div>
                                        <Text type='footnote'>
                                            <a href="http://fb.com">
                                                <Icon iconName={'class'} size='tiny'/>
                                            </a>
                                        </Text>
                                    </div>
                                    <div>
                                        <Text type='footnote'>
                                            <a href="http://youtube.com">
                                                <Icon iconName={'report'} size='tiny'/>
                                            </a>
                                        </Text>
                                    </div>
                                </div>
                                <Button onClick={() => this.toggleSidebar(true)} text='Форма обратной связи'/>

                            </div>

                    </div>
                </nav>
            </div>
        );
    }
}