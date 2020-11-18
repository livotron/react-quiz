import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
    1, 2, 3
];
class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a>Link {link}</a>
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }
        return (
            <>
                <nav className={cls.join(' ')}>
                    {this.renderLinks()}
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
            </>

        )
    }
}

export default Drawer;