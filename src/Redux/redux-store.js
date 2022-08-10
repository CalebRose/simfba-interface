import { createStore, applyMiddleware } from 'redux';
// Add Middleware to store
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
const middlewares = [];
const inDevelopment = false;
if (inDevelopment) {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
export default { store, persistor };
