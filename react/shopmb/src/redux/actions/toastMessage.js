export const addToastMessage = (type, message) => {
    const id = new Date().getTime();
    return {
        type: 'add_toastMessage',
        payload: { id, type, message },
    };
};
export const removeToastMessage = (id) => {
    return {
        type: 'remove_toastMessage',
        payload: { id },
    };
};
