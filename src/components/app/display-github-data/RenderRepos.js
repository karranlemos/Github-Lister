import React from 'react';

import Helpers from './helpers';

export default function RenderRepos(props) {
    const repos = props.repos;

    const stateReturns = {
        error: () => <div className="subcontainer center">{repos.message ?? 'Unknown Error'}</div>,
        empty: () => <div className="subcontainer center">No repos provided</div>,
        loading: () => <div className="subcontainer center"><span className="loading"></span></div>,
        loaded: () => {
            if (repos.data.length === 0) return (
                <div className="profile-repos">
                    <div className="profile-repo center">No repos found.</div>
                </div>
            );
            return (
                <div className="profile-repos">{repos.data.map(repo => {
                    const license = (repo.license && repo.license.name) ? repo.license.name : 'None';
                    return (
                        <div key={repo.id} className="profile-repo">
                            <div className="repo-title">{repo.name}</div>
                            <div className="profile-items">
                                {Helpers.getProfileItem('Language', repo.language ?? 'None')}
                                {Helpers.getProfileItem('Licence', license)}
                                {Helpers.getProfileItem('Description', repo.description ?? 'None')}
                                {Helpers.getProfileItem('URL', repo.html_url, true)}
                                {Helpers.getProfileItem('Created', Helpers.getDateString(repo.created_at, 'Unavailable'))}
                                {Helpers.getProfileItem('Updated', Helpers.getDateString(repo.updated_at, 'Unavailable'))}
                            </div>
                        </div>
                    )
                })}</div>
            );
        }
    };
    
    return (stateReturns[repos.state] ?? stateReturns['error'])();
}