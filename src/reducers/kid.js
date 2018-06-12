const initialState = {
    id: null,
    firstname: null,
    secondname: null,
    gender: null,
    avatar: null
};

const kid = (state = initialState, action) => {
      switch (action.type) {
        case 'ADD_KID':
            return Object.assign({}, state, {
                firstname: action.firstname,
                secondname: action.secondname,
                gender: action.gender,
                picture: action.picture,
            });
        case 'GET_KID':
            return Object.assign({}, state, {
                id: Object.values(action.kid)[0].id,
                firstname: Object.values(action.kid)[0].firstname,
                secondname: Object.values(action.kid)[0].secondname,
                gender: Object.values(action.kid)[0].gender,
                picture: Object.values(action.kid)[0].picture,
            });
        case 'SET_KID_AVATAR':
            return Object.assign({}, state, {
                avatar: action.avatar
            });
        case 'UPDATE_KID':
            return Object.assign({}, state, {
              id: action.id,
              firstname: action.firstname,
              secondname: action.secondname,
              gender: action.gender,
              picture: action.picture,
            });
        default:
            return state
    }
}

export default kid;
