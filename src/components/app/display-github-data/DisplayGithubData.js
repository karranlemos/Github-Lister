import React from 'react';
import PropTypes from 'prop-types';

import RenderUserData from './RenderUserData';
import RenderRepos from './RenderRepos';

export default class DisplayGithubData extends React.Component {
    state = {
        userData: '',
        repos: undefined,
    };

    componentDidUpdate(prevProps) {
        if (this.props.username !== prevProps.username) {
            this.emptyState();
            this.fetchUserData(this.props.username);
        }
    }

    render() {
        return (
            <React.Fragment>
                <RenderUserData userData={this.state.userData}/>
                <RenderRepos repos={this.state.repos}/>
            </React.Fragment>
        );
    }

    emptyState = () => {
        this.setState({
            userData: '',
            repos: undefined,
        });
    }



    fetchUserData = (username) => {
        const url = `https://api.github.com/users/${username}`;

        if (username === '') {
            this.setState({
                userData: ''
            });
            return;
        }

        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 404) {
                this.setState({userData: 'User Not Found'});
                return;
            }
            if (request.status !== 200) {
                this.setState({userData: "Couldn't fetch data"});
                return;
            }

            try {
                var userData = JSON.parse(request.responseText);
            }
            catch (e) {
                this.setState({userData: "Couldn't parse data"});
                return;
            }

            this.setState({userData: userData})
            this.fetchRepos(userData.repos_url);
        };
        request.open('get', url);
        request.send();
    };

    fetchRepos = (reposUrl) => {
        if (!reposUrl) {
            console.log("reposUrl undefined");
            return;
        }

        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 404) {
                console.log(`No repository on "${reposUrl}".`);
                return;
            }
            if (request.status !== 200) {
                console.log(`Couldn't fetch data from "${reposUrl}".`);
                return;
            }

            try {
                var repos = JSON.parse(request.responseText);
            }
            catch (e) {
                console.log("Couldn't parse data");
                return;
            }

            this.setState({repos: repos})
        };
        request.open('get', reposUrl);
        request.send();
    };



    static propTypes = {
        username: PropTypes.string.isRequired,
    }
}