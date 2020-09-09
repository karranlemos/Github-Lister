import React from 'react'

import Default from '../layout/Default';

export default function About() {
    const content = (
        <div className="subcontainer">
            <h1>About</h1>
            <p>A simple React App that displays a user's profile data and their repositories.</p>
        </div>
    );

    return <Default content={content}/>;
}