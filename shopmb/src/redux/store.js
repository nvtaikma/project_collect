import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = function (store) {
    return function (next) {
        return async function (action) {
            // if (action.type === 'form_fix') {
            //     try {
            //         const getUrl = action.payload.getUrl;
            //         const response = await getUrl({ id: action.payload.id });
            //         action.payload = response[0];
            //     } catch (error) {
            //         console.log(error);
            //     }
            // }
            return next(action);
        };
    };
};

const myMiddleware = applyMiddleware(loggerMiddleware);
const store = createStore(rootReducer, composeEnhancer(myMiddleware));
export const persistor = persistStore(store);
export default store;
