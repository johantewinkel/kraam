
import firebase from '../firebase';
import DeviceInfo from 'react-native-device-info';
import FCM, { FCMEvent, NotificationType } from 'react-native-fcm';

export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
});

export const sendMessage = (text, user, index='') => {
    return function (dispatch) {
        let msg = {
                text: text,
                picture: index,
                time: Date.now(),
                author: {
                    name: user.name,
                    avatar: user.avatar
                }
            };

        const newMsgRef = firebase.database()
                                  .ref('messages')
                                  .push();
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);

        dispatch(addMessage(msg));
    };
};

export const createKid = (firstname, secondname, gender, user, image, id) => {
        let kid = {
                firstname: firstname,
                picture: image,
                secondname: secondname,
                gender: gender,
                author: {
                    name: user.name,
                    avatar: user.avatar
                }
            };
        if(id !== null)
        {
            const kidref = firebase.database().ref("kids").child(id).update({ firstname: firstname, secondname: secondname, gender: gender, image: image });
        }
        else {
          const kidref = firebase.database()
                                    .ref("kids")
                                    .push();

          kid.id = kidref.key;
          kidref.set(kid);
        }
};

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});

export const fetchMessages = () => {
    return function (dispatch) {
        dispatch(startFetchingMessages());

        firebase.database()
                .ref('messages')
                .orderByKey()
                .limitToLast(20)
                .on('value', (snapshot) => {
                    // gets around Redux panicking about actions in reducers
                    setTimeout(() => {
                        const messages = snapshot.val() || [];

                        dispatch(receiveMessages(messages))
                    }, 0);
                });
    }
}

export const receiveMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

        dispatch(receivedMessages());
    }
}

export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: 'UPDATE_MESSAGES_HEIGHT',
        height: layout.height
    }
}

export const getFriends = (kid) => {
    return function (dispatch) {
      firebase.database()
                .ref('friends')
                .orderByChild('kid/id/')
                .equalTo(kid.id)
                .on('value', (snapshot) => {
                  const frnds = snapshot.val() || [];
                  dispatch(receiveFriends(frnds));
                });
    }
}

export const addFriend = (friend) => ({
    type: 'ADD_FRIEND',
    ...friend
});


export const receiveFriends = (frnds) => {
    return function (dispatch) {
        console.log('Friendsdsds', frnds);
        if(typeof frnds == 'object'){
          console.log('Is object', Object.values(frnds));
          Object.values(frnds).forEach(friend => dispatch(addFriend(friend))//console.log('log', friend)
            );//dispatch(addFriend(friend)));
        }
        else console.log('Is not object');
    }
}

export const sendFriend = (user, friend, kid) => {
    console.log('Send friend', friend);
    return function (dispatch) {
        let frnd = {
                firstname: friend.firstname,
                lastname: friend.lastname,
                gender: friend.gender,
                role: friend.role,
                author: {
                    name: user.name,
                    avatar: user.avatar
                },
                kid: {
                  id: kid.id,
                }
            };

        const newfrndRef = firebase.database()
                                  .ref('friends')
                                  .push();
        frnd.id = newfrndRef.key;
        newfrndRef.set(frnd);

        dispatch(addFriend(frnd));
    };
};



export const setUserName = (name) => ({
    type: 'SET_USER_NAME',
    name
});

export const setUserAvatar = (avatar) => ({
    type: 'SET_USER_AVATAR',
    avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
});

export const updateKid = (kid) => ({
    type: 'ADD_KID',
    kid:kid
});

export const getKid = (kid) => ({
    type: 'GET_KID',
    kid:kid
});

export const getKiddo = (user) => {
  return function (dispatch, getState) {
    let kid= firebase.database()
        .ref('kids').orderByChild('author/name/').equalTo(user.name).limitToLast(1).on("value", function(snapshot) {
        dispatch(getKid(snapshot.val()));
      });
  }
  //return {firstname: first.firstname};
}

export const setKidAvatar = (avatar) => ({
    type: 'SET_KID_AVATAR',
    avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
});

export const login = () => {
    return function (dispatch, getState) {
        dispatch(startAuthorizing());

        firebase.auth()
                .signInAnonymously()
                .then(() => {
                    const { name, avatar } = getState().user;

                    firebase.database()
                          //  .ref(`users/${DeviceInfo.getUniqueID()}`)
                          .ref(`users/123`)
                          .set({
                                name,
                                avatar
                            });

                    startChatting(dispatch);
                });
    }
}

export const checkUserExists = () => {
    return function (dispatch) {
        dispatch(startAuthorizing());

        firebase.auth()
                .signInAnonymously()
                .then(() => firebase.database()
                                    //.ref(`users/${DeviceInfo.getUniqueID()}`)
                                    .ref(`users/123`)
                                    .once('value', (snapshot) => {
                                        const val = snapshot.val();

                                        if (val === null) {
                                            dispatch(userNoExist());
                                        }else{
                                            dispatch(setUserName(val.name));
                                            dispatch(setUserAvatar(val.avatar));
                                            startChatting(dispatch);
                                        }
                                    }))
                .catch(err => console.log(err))
    }
}

const startChatting = function (dispatch) {
    dispatch(userAuthorized());
    dispatch(fetchMessages());
/**
    FCM.requestPermissions();
    FCM.getFCMToken()
       .then(token => {
           console.log(token)
       });

    FCM.on(FCMEvent.Notification, async (notif) => {
        console.log(notif);

        if (Platform.OS === 'ios') {
            switch (notif._notificationType) {
                case NotificationType.Remote:
                    notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                    break;
                case NotificationType.NotificationResponse:
                    notif.finish();
                    break;
                case NotificationType.WillPresent:
                    notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
                    break;
              }
            }
    });

    FCM.on(FCMEvent.RefreshToken, token => {
        console.log(token);
    });

**/

    /* PushNotification.configure({
       onRegister: function (token) {
       console.log('registered!');
       console.log('TOKEN:', token);
       },

       onNotification: function (notification) {
       console.log('NOTIFICATION: ', notification);
       },

       requestPermissions: true
       }); */
}

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
