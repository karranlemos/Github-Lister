import React from 'react';

import SearchUser from './SearchUser';
import DisplayGithubData from './display-github-data/DisplayGithubData';

export default class Checker extends React.Component {

    state = {
        username: ''
    };

    render() {
        return (
            <div className="checker-container">
                <SearchUser submitUsername={this.submitUsername}/>
                <DisplayGithubData username={this.state.username}/>
            </div>
        );
    }

    submitUsername = (username) => {
        this.setState({
            username: username
        });
    };
}