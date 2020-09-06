import React from 'react'

import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <nav id="nav">
            <div className="container">
                <Link className="nav-button main-button" to="/">GitHub Lister</Link>
                <div className="nav-options">
                    <Link className="nav-button" to="/">Home</Link>
                    <Link className="nav-button" to="/about">About</Link>
                </div>
            </div>
        </nav>
    );
}