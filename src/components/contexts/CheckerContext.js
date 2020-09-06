import React from 'react';

const CheckerContext = React.createContext({
    state: {
        username: '',
    },
    searchUser: (username) => {},
});

export default CheckerContext;