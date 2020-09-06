import React from 'react';

import helpers from './helpers';

export default function RenderRepos(props) {
    const repos = props.repos;

    if (repos === undefined) {
        return null;
    }
    if (repos.length === 0) {
        return null;
    }
    
    return (
        <div className="repos-results">
            <h2>Repos</h2>
            {repos.map(repo => (
                <table key={repo.name} className="results">
                    <tbody>
                        {helpers.createDataRow('Name', repo.name)}
                        {helpers.createDataRow('Language', repo.language)}
                        {helpers.createDataRow('Licence', repo.licence ?? 'None')}
                        {helpers.createDataRow('Description', repo.description ?? 'None')}
                        {helpers.createDataRow('URL', repo.html_url, true)}
                        {helpers.createDataRow('Created', repo.created_at)}
                        {helpers.createDataRow('Updated', repo.updated_at)}
                    </tbody>
                </table>
            ))}
        </div>
    );
}