export const FORM = 'FORM';

export const formInput = (name,value) => {
    return {
        type: FORM,
        payload: {
            name,
            value
        }
    };
};
