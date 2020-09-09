import React from 'react';

import Header from './inc/Header';
import Footer from './inc/Footer';

export default function Default(props) {
    return (
        <div className="app-wrapper">
            <Header/>
            <main id="main">
                <div className="container">
                    {props.content}
                </div>
            </main>
            <Footer/>
        </div>
    );
}