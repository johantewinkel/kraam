
import { combineReducers } from 'redux';

import chatroom from './chatroom';
import user from './user';
import navReducer from './navReducer';
import kid from './kid';
import friends from './friends';
import { combineForms } from 'react-redux-form';
import schema from './schema';

const initialState = {
    name: '',
    avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
};


const rootReducer = combineReducers({
    chatroom,
    user,
    nav:navReducer,
    kid,
    friends,
    schema: combineForms({
      schema: initialState
    }, 'schema')
});

export default rootReducer;
