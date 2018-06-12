import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
//import { Ionicons } from '@expo/vector-icons';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import ChatUI from './ChatUI';
import StartUI from './StartUI';
import LoginUI from './LoginUI';

const mapStateToProps = (state) => ({
    authorizing: state.user.authorizing
});

const LoginOrChat = connect(
    (state) => ({
        authorized: state.user.authorized
    }))
    (({ authorized, dispatch }) => {
    if (authorized) {
        return (<ChatUI />);
    }else{
        dispatch(checkUserExists());
        return (<LoginUI />);
    }
});

class Start extends Component {
    render() {
        return (
            <Screen style={{alignItems: 'center', justifyContent: 'center'}}>
              </LoginOrChat>
            </Screen>
        );
    }
}

export default connect(mapStateToProps)(Start);
