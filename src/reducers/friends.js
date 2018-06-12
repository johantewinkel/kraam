import { combineReducers } from 'redux';

//import friend from './friend';

const friend = (state, action) => {
    console.log('Receive friends', friends);
    switch (action.type) {
        case 'ADD_FRIEND':
            return {
              id: action.id,
              firstname: action.firstname,
              lastname: action.lastname,
              gender: action.gender,
              picture: action.picture,
              role: action.role,
              rights: action.rights
            }
        default:
            return state
    }
}

const friends = (state = [], action) => {
    if(action.type === 'ADD_FRIEND') console.log('call friends action', (action.friend));
    switch (action.type) {
        case 'ADD_FRIEND':
          if (state.map(friend => friend.id).includes(action.id)) {
              return state;
          }else{
              return [
              ...state,
              friend(undefined, action)
              ]
          }
        case 'DELETE_FRIEND':
              return Object.assign({}, state, {
                  firstname: action.firstname,
                  lastname: action.lastname,
                  gender: action.gender,
                  picture: action.picture,
                  role: action.role,
                  rights: action.rights
            });
        case 'GET_FRIENDS':
            return Object.assign({}, state, {
                id: Object.values(action.friend)[0].id,
                firstname: Object.values(action.friend)[0].firstname,
                lastname: Object.values(action.lastname)[0].lastname,
                gender: Object.values(action.friend)[0].gender,
                picture: Object.values(action.friend)[0].picture,
            });
        default:
            return state
    }
}

export default friends;
