import React from 'react'

import Default from '../layout/Default';

export default function Home() {
    const content = (
        <React.Fragment>
            <h2>Homepage</h2>
            <p>Hello there!</p>
        </React.Fragment>
    );
    return <Default content={content}/>;
}