export const addCart = (payload) => {
    const id = new Date().getTime();
    return {
        type: 'add_cart',
        payload: { id, ...payload },
    };
};
export const updateCart = (payload) => {
    console.log(payload);
    return {
        type: 'update_cart',
        payload,
    };
};
export const deleteCart = (id) => {
    return {
        type: 'delete_cart',
        payload: { id },
    };
};
export const deleteAll = () => {
    return {
        type: 'delete_all',
    };
};
