export const addUser = (data) => {
    return {
        type: 'add_user',
        payload: data,
    };
};
export const updateUser = (data) => {
    return {
        type: 'update_user',
        payload: data,
    };
};
export const deleteUser = () => {
    return {
        type: 'delete_user',
    };
};
