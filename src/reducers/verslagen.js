const verslag = (state, action) => {
    switch (action.type) {
        case 'ADD_VERSLAG':
            return {
                id: action.id,
                text: action.text,
                time: action.time,
                author: action.author
            }
        case 'SEND_VERSLAG':
            let msg = {
                text: action.text,
                time: Date.now(),
                author: {
                    name: action.user.name,
                    avatar: action.user.avatar
                }
            };

            const newMsgRef = firebase.database()
                                      .ref('verslagen')
                                      .push();
            msg.id = newMsgRef.key;
            newMsgRef.set(msg);

            return msg;
        default:
            return state
    }
}

const verslagen = (state = [], action) => {
    switch (action.type) {
        case 'ADD_VERSLAG':
            if (state.map(m => m.id).includes(action.id)) {
                return state;
            }else{
                return [
                ...state,
                verslag(undefined, action)
                ]
            }
        case 'SEND_VERSLAG':
            return [
                ...state,
                verslag(undefined, action)
            ]
        default:
            return state
    }
};


export default verslagen;
