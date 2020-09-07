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
        <div class="profile-data">
            <header class="profile-header profile-item">
                <img class="profile-picture" src={userData.avatar_url} alt="Profile Picture"/>
                <div className="username">{userData.login}</div>
                <div className="user-type">{userData.type}</div>
            </header>
            {userData.bio ? <div className="profile-item">{userData.bio}</div> : null}
            <div className="profile-item name-value-item">
                <div className="item-name">URL</div>
                <div className="item-value"><a href={userData.html_url}>{userData.html_url}</a></div>
            </div>
            <div className="profile-item name-value-item">
                <div className="item-name">Created</div>
                <div className="item-value">{Helpers.getDateString(userData.created_at)}</div>
            </div>
            <div className="profile-item name-value-item">
                <div className="item-name">Updated</div>
                <div className="item-value">{Helpers.getDateString(userData.updated_at)}</div>
            </div>
        </div>
    );
}