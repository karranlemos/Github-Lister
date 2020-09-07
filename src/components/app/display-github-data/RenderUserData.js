import React from 'react';

import Helpers from './helpers';

export default function RenderUserData(props) {
    const userData = props.userData;

    const stateReturns = {
        error: () => <div className="subcontainer center">{userData.message ?? 'Unknown Error'}</div>,
        empty: () => <div className="subcontainer center">No user provided</div>,
        loading: () => <div className="subcontainer center"><span className="loading"></span></div>,
        loaded: () => (
            <div className="profile-data">
                <header className="profile-header">
                    <img className="profile-picture" src={userData.data.avatar_url} alt="Profile Picture"/>
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
        ),
    }

    return (stateReturns[userData.state] ?? stateReturns['error'])();
}