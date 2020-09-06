import React from 'react';

import helpers from './helpers';

export default function RenderUserData(props) {
    const userData = props.userData;

    if (userData === undefined) {
        return (<p>Not Found</p>);
    }
    if (userData === '') {
        return null;
    }
    if (typeof userData === 'string') {
        return <p>{userData}</p>
    }

    return (
        <div class="userdata-results">
            <h2>User Data</h2>
            <table className="results">
                <tbody>
                    {helpers.createDataRow('Username', userData.login)}
                    {helpers.createDataRow('URL', userData.html_url, true)}
                    {helpers.createDataRow('Created', userData.created_at)}
                    {helpers.createDataRow('Updated', userData.updated_at)}
                </tbody>
            </table>
        </div>
    );
}