import React from 'react';

class Helpers {
    constructor() {
        throw 'Static Class';
    }

    static getDateString(anyDate) {
        const createdDate = new Date(anyDate);
        if (String(createdDate) === 'Invalid Date')
            throw 'Invalid Date';
        
        const day = String(createdDate.getDate()).padStart(2, '0');
        const month = String(createdDate.getMonth()+1).padStart(2, '0');
        const year = String(createdDate.getFullYear()).padStart(4, '0');

        return `${day}/${month}/${year}`;
    }

    static getProfileItem(name, value) {
        return (
            <div className="profile-item name-value-item">
                <div className="item-name">{name}</div>
                <div className="item-value">{value}</div>
            </div>
        );
    }
};

export default Helpers;