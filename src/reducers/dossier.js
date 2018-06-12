import { combineReducers } from 'redux';

import verslagen from './verslagen';

const initialState = {
    isFetching: false,
    lastFetched: null,
    height: 0
}

const meta = (state = initialState, action) => {
    switch (action.type) {
        case 'START_FETCHING_VERSLAGEN':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVED_VERSLAGEN':
            return Object.assign({}, state, {
                isFetching: false,
                lastFetched: action.receivedAt
            });
        case 'UPDATE_VERSLAGEN_HEIGHT':
            return Object.assign({}, state, {
                height: action.height
            });
        default:
            return state
    }
}

const dossier = combineReducers({
    verslagen,
    meta
});

export default dossier;
