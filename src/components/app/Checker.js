import React from 'react';

import SearchUser from './SearchUser';
import DisplayGithubData from './display-github-data/DisplayGithubData';

export default class Checker extends React.Component {

    state = {
        username: ''
    };

    render() {
        return (
            <React.Fragment>
                <SearchUser submitUsername={this.submitUsername}/>
                <DisplayGithubData username={this.state.username}/>
            </React.Fragment>
        );
    }

    submitUsername = (username) => {
        this.setState({
            username: username
        });
    };
}