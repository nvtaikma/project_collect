export const initValue = {
    openForm: false,
    typeForm: '',
};

export const reducer = (state, action) => {
    switch (action) {
        case 'form_add':
            return {
                ...state,
                openForm: true,
                typeForm: 'add',
            };
        case 'form_update':
            return {
                ...state,
                openForm: true,
                typeForm: 'update',
            };
        case 'form_info':
            return {
                ...state,
                openForm: true,
                typeForm: 'info',
            };
        case 'close_form':
            return {
                ...state,
                openForm: false,
                typeForm: '',
            };
        default:
            return state;
    }
};
