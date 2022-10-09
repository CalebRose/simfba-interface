import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cbbTeamReducer from './cbbTeam/cbbTeam.reducer';
import cfbTeamReducer from './cfbTeam/cfbTeam.reducer';
import timestampReducer from './timestamp/timestamp.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
};

const rootReducer = combineReducers({
    user: userReducer,
    timestamp: timestampReducer,
    cfbTeam: cfbTeamReducer,
    cbbTeam: cbbTeamReducer
});

export default persistReducer(persistConfig, rootReducer);
