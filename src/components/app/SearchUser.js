import React from 'react';

import CheckerContext from '../contexts/CheckerContext';

export default class SearchUser extends React.Component {
    static contextType = CheckerContext;

    state = {
        username: '',
    };

    render() {
        return (
            <React.Fragment>
                <form action="" className="wide-search-form" onSubmit={this.search}>
                    <input
                        type="search"
                        name="username"
                        placeholder="Search for user..."
                        onChange={this.onChange}
                    />
                    <button
                        type="submit"
                        className="primary"
                    >Search</button>
                </form>
            </React.Fragment>
        );
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    search = (e) => {
        e.preventDefault();
        this.context.searchUser(this.state.username);
        this.setState({username: ''});
        e.target.reset();
    }
}