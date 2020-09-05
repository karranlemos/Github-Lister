import React from 'react';

import Header from './inc/Header';
import Footer from './inc/Footer';

export default function Default(props) {
    return (
        <div className="container">
            <Header/>
            <main>
                {props.content}
            </main>
            <Footer/>
        </div>
    );
}