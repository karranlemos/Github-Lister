import React from 'react';

import SearchUser from './SearchUser';
import DisplayUserData from './DisplayUserData';

import CheckerContext from '../contexts/CheckerContext';

export default class Checker extends React.Component {
    state = {
        githubData: {
            userData: undefined,
            error: false,
            message: undefined,
        }
    };

    componentDidMount() {
        this.setEmptySearchState();
    }

    render() {
        return (
            <CheckerContext.Provider value={{
                state: this.state,
                searchUser: this.searchUser,
            }}>
                <div className="checker-container">
                    <SearchUser/>
                    <DisplayUserData githubData={this.state.githubData}/>
                </div>
            </CheckerContext.Provider>
        );
    }

    searchUser = (username) => {
        const url = `https://api.github.com/users/${username}`;

        if (username === '') {
            this.setEmptySearchState();
            return;
        }

        const request = new XMLHttpRequest();
        request.onload = () => {
            if (request.status === 404) {
                this.setErrorState("User not found.")
                return;
            }
            if (request.status !== 200) {
                this.setErrorState("Couldn't fetch data");
                return;
            }
            
            try {
                var userData = JSON.parse(request.responseText);
            }
            catch (e) {
                this.setErrorState("Could not parse JSON");
                return;
            }

            this.setFoundDataState(userData);
        };
        request.open('get', url);
        request.send();
    };

    setEmptySearchState = () => {
        this.setState({
            githubData: {
                userData: undefined,
                error: false,
                message: undefined,
            }
        });
    }

    setErrorState = (message='Unknown Error') => {
        this.setState({
            githubData: {
                userData: undefined,
                error: true,
                message: message,
            }
        });
    }

    setFoundDataState = (userData) => {
        this.setState({
            githubData: {
                userData: userData,
                error: false,
                message: undefined,
            }
        });
    }
}