// Functions which return objects
import { ViewModeActionTypes } from './viewMode.types';
export const setViewMode = (view) => ({
    type: ViewModeActionTypes.SET_VIEW_MODE,
    payload: view
});
