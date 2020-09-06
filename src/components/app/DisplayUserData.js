import React from 'react';
import PropTypes from 'prop-types';

export default class DisplayUserData extends React.Component {

    render() {
        const hasData = (this.props.githubData.userData !== undefined);
        const isError = this.props.githubData.error;
        if (hasData) {
            // pass
        }
        else if (isError) {
            return <p>{this.props.githubData.message ?? 'Unknown Error'}</p>;
        }
        else {
            if (this.props.githubData.message)
                return <p>{this.props.githubData.message}</p>;
            else
                return null;
        }

        const userData = this.props.githubData.userData;

        return (
            <table className="results">
                <tbody>
                    {this.createDataRow('Username', userData.login)}
                    {this.createDataRow('URL', userData.html_url)}
                    {this.createDataRow('Created', userData.created_at)}
                    {this.createDataRow('Updated', userData.updated_at)}
                </tbody>
            </table>
        );
    }

    createDataRow(head, data) {
        if (!data)
            return null;

        return (
            <tr>
                <th>{head}</th>
                <td>{data}</td>
            </tr>
        );
    }
    
    static propTypes = {
        githubData: PropTypes.object.isRequired,
    };
}