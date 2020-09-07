import React from 'react';
import PropTypes from 'prop-types';

import RenderUserData from './RenderUserData';
import RenderRepos from './RenderRepos';

export default class DisplayGithubData extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.generateEmptyState();
    }

    setEmptyState = () => {
        this.setState(this.generateEmptyState());
    }

    generateEmptyState = () => {
        return {
            userData: {
                data: '',
                errorMessage: null,
            },

            repos: {
                data: undefined,
                errorMessage: null,
            },
        }
    }

    componentDidMount() {
        this.setEmptyState();
    }

    componentDidUpdate(prevProps) {
        if (this.props.username !== prevProps.username) {
            this.setEmptyState();
            this.fetchUserData(this.props.username);
        }
    }

    render() {
        if (this.state.userData.data === '')
            return null;

        return (
            <div class="subcontainer split">
                <RenderUserData userData={this.state.userData}/>
                <RenderRepos repos={this.state.repos}/>
            </div>
        );
    }



    fetchUserData = (username) => {
        const url = `https://api.github.com/users/${username}`;

        if (username === '') {
            this.setUserData('');
            return;
        }

        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 404) {
                this.setErrorUserData('User Not Found');
                return;
            }
            if (request.status !== 200) {
                this.setErrorUserData("Couldn't fetch data");
                return;
            }

            try {
                var userData = JSON.parse(request.responseText);
            }
            catch (e) {
                this.setErrorUserData("Couldn't parse data");
                return;
            }

            this.setUserData(userData)
            this.fetchRepos(userData.repos_url);
        };
        request.open('get', url);
        request.send();
    };

    fetchRepos = (reposUrl) => {
        if (!reposUrl) {
            this.setErrorRepos("reposUrl undefined");
            return;
        }

        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 404) {
                this.setErrorRepos(`No repository on "${reposUrl}".`);
                return;
            }
            if (request.status !== 200) {
                this.setErrorRepos(`Couldn't fetch data from "${reposUrl}".`);
                return;
            }

            try {
                var repos = JSON.parse(request.responseText);
            }
            catch (e) {
                this.setErrorRepos("Couldn't parse data");
                return;
            }

            this.setRepos(repos);
        };
        request.open('get', reposUrl);
        request.send();
    };

    setUserData = (data) => {
        this.setState({
            userData: {
                data: data
            }
        });
    }

    setRepos = (data) => {
        this.setState({
            repos: {
                data: data
            }
        });
    }

    setErrorUserData = (errorMessage) => {
        this.setState({
            userData: {
                errorMessage: errorMessage
            }
        });
    }

    setErrorRepos = (errorMessage) => {
        this.setState({
            repos: {
                errorMessage: errorMessage
            }
        });
    }



    static propTypes = {
        username: PropTypes.string.isRequired,
    }
}