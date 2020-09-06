import React from 'react';

const helpers = {
    createDataRow(head, data, link=false) {
        if (!head || !data)
            return null;
    
        if (link)
            data = <a href={data} target="_blank" rel="noopener noreferrer">{data}</a>;
    
        return (
            <tr>
                <th>{head}</th>
                <td>{data}</td>
            </tr>
        );
    }
};

export default helpers;