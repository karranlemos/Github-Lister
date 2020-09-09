import React from 'react'

import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {
    state = {
        mobileMenu: false
    };

    render() {
        return (
            <nav id="nav" className={this.state.mobileMenu ? 'show' : ''}>
                <div className="container">
                    <Link className="nav-button main-button" to="/" onClick={this.closeMenu}>GitHub Lister</Link>
                    <div className="mobile-menu-button nav-button" onClick={this.toggleMenu}></div>
                    <div className="nav-options">
                        <Link className="nav-button" to="/" onClick={this.closeMenu}>Home</Link>
                        <Link className="nav-button" to="/about" onClick={this.closeMenu}>About</Link>
                    </div>
                </div>
            </nav>
        );
    }

    toggleMenu = () => {
        this.setState({
            mobileMenu: !this.state.mobileMenu
        });
    }

    closeMenu = () => {
        this.setState({
            mobileMenu: false
        });
    }
}