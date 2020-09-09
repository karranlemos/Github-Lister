import React from 'react';
import PropTypes from 'prop-types';

export default class SearchUser extends React.Component {
    state = {
        username: '',
    };

    render() {
        return (
            <div className="search-form-container subcontainer">
                <form action="" className="wide-search-form" onSubmit={this.search}>
                    <input
                        type="search"
                        name="username"
                        placeholder="Enter username..."
                        onChange={this.onChange}
                    />
                    <button
                        type="submit"
                        className="primary"
                    >Search</button>
                </form>
            </div>
        );
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    search = (e) => {
        e.preventDefault();
        this.props.submitUsername(this.state.username);
        this.setState({username: ''});
        e.target.reset();
    }

    static propTypes = {
        submitUsername: PropTypes.func.isRequired,
    }
}