import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cbbTeamReducer from './cbbTeam/cbbTeam.reducer';
import cfbTeamReducer from './cfbTeam/cfbTeam.reducer';
import nflTeamReducer from './nflTeam/nflTeam.reducer';
import nbaTeamReducer from './nbaTeam/nbaTeam.reducer';
import timestampReducer from './timestamp/timestamp.reducer';
import userReducer from './user/user.reducer';
import viewReducer from './viewMode/viewMode.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
};

const rootReducer = combineReducers({
    user: userReducer,
    timestamp: timestampReducer,
    cfbTeam: cfbTeamReducer,
    cbbTeam: cbbTeamReducer,
    nflTeam: nflTeamReducer,
    nbaTeam: nbaTeamReducer,
    viewMode: viewReducer
});

export default persistReducer(persistConfig, rootReducer);
