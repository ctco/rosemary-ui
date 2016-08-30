const initialState = {
    initialValues: {
        range: {
            from: '01.01.2016',
            to: '10.01.2016'
        }
    },
    cities: [
        {
            id: 1,
            displayString: 'Dagda'
        },
        {
            id: 2,
            displayString: 'Rezekne'
        },
        {
            id: 3,
            displayString: 'Kraslava'
        }
    ]
};

export default (state = initialState, action) => {
    return state;
};
