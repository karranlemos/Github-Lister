import React from 'react';

import Helpers from './helpers';

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
        <div className="profile-data">
            <header class="profile-header">
                <img class="profile-picture" src={userData.avatar_url} alt="Profile Picture"/>
                <div className="username">{userData.login}</div>
                <div className="user-type">{userData.type}</div>
            </header>
            {Helpers.getProfileItem('Name', userData.name ?? 'unavailable')}
            {Helpers.getProfileItem('Bio', userData.bio ?? 'unavailable')}
            {Helpers.getProfileItem('URL', <a href={userData.html_url}>{userData.html_url}</a>)}
            {Helpers.getProfileItem('Created', Helpers.getDateString(userData.created_at))}
            {Helpers.getProfileItem('Updated', Helpers.getDateString(userData.updated_at))}
        </div>
    );
}