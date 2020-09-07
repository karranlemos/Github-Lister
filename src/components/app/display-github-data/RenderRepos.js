import React from 'react';

import Helpers from './helpers';

export default function RenderRepos(props) {
    const repos = props.repos;

    if (repos === undefined) {
        return null;
    }
    if (repos.length === 0) {
        return (
            <div className="profile-repos">
                <div className="profile-repo">No repos found.</div>
            </div>
        );
    }
    
    return (
        <div className="profile-repos">
            {repos.map(repo => {
                const license = (repo.license && repo.license.name) ? repo.license.name : 'None';
                return (
                    <div key={repo.id} className="profile-repo">
                        <div className="repo-title">{repo.name}</div>
                        {Helpers.getProfileItem('Language', repo.language)}
                        {Helpers.getProfileItem('Licence', license)}
                        {Helpers.getProfileItem('Description', repo.description ?? 'None')}
                        {Helpers.getProfileItem('URL', repo.html_url, true)}
                        {Helpers.getProfileItem('Created', Helpers.getDateString(repo.created_at))}
                        {Helpers.getProfileItem('Updated', Helpers.getDateString(repo.updated_at))}
                    </div>
                )
            })}
        </div>
    );
}