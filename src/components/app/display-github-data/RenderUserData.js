import React from 'react';

import Helpers from './helpers';

export default function RenderUserData(props) {
    const userData = props.userData;

    if (userData.errorMessage) {
        return <p>{userData.errorMessage}</p>;
    }
    if (userData.data === '') {
        return null;
    }

    return (
        <div className="profile-data">
            <header class="profile-header">
                <img class="profile-picture" src={userData.data.avatar_url} alt="Profile Picture"/>
                <div className="username">{userData.data.login}</div>
                <div className="user-type">{userData.data.type}</div>
            </header>
            <div className="profile-items">
                {Helpers.getProfileItem('Name', userData.data.name ?? 'unavailable')}
                {Helpers.getProfileItem('Bio', userData.data.bio ?? 'unavailable')}
                {Helpers.getProfileItem('URL', userData.data.html_url, true)}
                {Helpers.getProfileItem('Created', Helpers.getDateString(userData.data.created_at))}
                {Helpers.getProfileItem('Updated', Helpers.getDateString(userData.data.updated_at))}
            </div>
        </div>
    );
}