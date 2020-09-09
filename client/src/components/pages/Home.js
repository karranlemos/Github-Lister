import React from 'react'

import Default from '../layout/Default';
import Checker from '../app/Checker';

export default function Home() {
    const content = (
        <React.Fragment>
            <Checker/>
        </React.Fragment>
    );
    return <Default content={content}/>;
}