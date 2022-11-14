const initState = {};

const user = (state = initState, action) => {
    switch (action.type) {
        case 'add_user':
            return {
                ...action.payload,
            };
        case 'update_user':
            return {
                ...state,
                ...action.payload,
            };
        case 'delete_user':
            return {};
        default:
            return state;
    }
};

export default user;
