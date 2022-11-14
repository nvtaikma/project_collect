const initState = [];
const toastMessage = (state = initState, action) => {
    switch (action.type) {
        case 'add_toastMessage':
            return [
                ...state,
                {
                    id: action.payload.id,
                    type: action.payload.type,
                    message: action.payload.message,
                },
            ];
        case 'remove_toastMessage':
            const newState = state.filter((item) => {
                return item.id !== action.payload.id;
            });
            return newState;
        default:
            return state;
    }
};
export default toastMessage;
