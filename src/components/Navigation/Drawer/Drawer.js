import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

class Drawer extends Component {
    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer]

        const links = [
            {to: '/', label: 'List', exact: true}        
        ];

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Create Quiz', exact: false})
            links.push({to: '/logout', label: 'Log out', exact: false})
        } else {
            links.push({to: '/auth', label: 'Auth', exact: false});
        }

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }
        return (
            <>
                <nav className={cls.join(' ')}>
                    {this.renderLinks(links)}
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
            </>

        )
    }
}

export default Drawer;