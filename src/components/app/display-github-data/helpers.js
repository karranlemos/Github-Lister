

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
};

export default Helpers;