import React from 'react';
import PropTypes from 'prop-types';

import RenderUserData from './RenderUserData';
import RenderRepos from './RenderRepos';

const AUTHENTICATION = '';

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
                state: 'empty',
                message: null,
            },

            repos: {
                data: undefined,
                state: 'empty',
                message: null,
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
        const userStateReturns = {
            empty: () => null,
            error: () => <div className="subcontainer center">{this.state.userData.message}</div>,
            loading: () => <div className="subcontainer center"><span className="loading"></span></div>,
            
            delegate: () => (
                <div className="subcontainer split">
                    <RenderUserData userData={this.state.userData}/>
                    <RenderRepos repos={this.state.repos}/>
                </div>
            ),
        };

        if (['empty', 'error', 'loading'].includes(this.state.userData.state))
            return userStateReturns[this.state.userData.state]();
        return userStateReturns.delegate();
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
                this.setUserDataError('User Not Found.');
                return;
            }
            if (request.status === 403) {
                this.setUserDataError('Forbidden from accessing the API. API rate limit might have been exceeded.');
                return;
            }
            if (request.status !== 200) {
                this.setUserDataError("Couldn't fetch data.");
                return;
            }

            try {
                var userData = JSON.parse(request.responseText);
            }
            catch (e) {
                this.setUserDataError("Couldn't parse data");
                return;
            }

            this.setUserData(userData)
            this.fetchRepos(userData.repos_url);
        };
        request.open('get', url);

        this.setUserDataLoading();
        request.send();
    };

    fetchRepos = (reposUrl) => {
        if (!reposUrl) {
            this.setReposError("reposUrl undefined");
            return;
        }

        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 404) {
                this.setReposError(`No repository on "${reposUrl}".`);
                return;
            }
            if (request.status !== 200) {
                this.setReposError(`Couldn't fetch data from "${reposUrl}".`);
                return;
            }

            try {
                var repos = JSON.parse(request.responseText);
            }
            catch (e) {
                this.setReposError("Couldn't parse data");
                return;
            }

            this.setRepos(repos);
        };
        request.open('get', reposUrl);

        this.setReposLoading();
        request.send();
    };

    setUserData = (data) => {
        this.setState({
            userData: {
                data: data,
                state: 'loaded'
            }
        });
    }

    setUserDataError = (message) => {
        this.setState({
            userData: {
                message: message,
                state: 'error'
            }
        });
    }

    setUserDataLoading = () => {
        this.setState({
            userData: {
                state: 'loading'
            }
        });
    }

    setRepos = (data) => {
        this.setState({
            repos: {
                data: data,
                state: 'loaded'
            }
        });
    }

    setReposError = (message) => {
        this.setState({
            repos: {
                message: message,
                state: 'error'
            }
        });
    }

    setReposLoading = () => {
        this.setState({
            repos: {
                state: 'loading'
            }
        });
    }



    static propTypes = {
        username: PropTypes.string.isRequired,
    }
}