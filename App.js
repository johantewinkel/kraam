import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
//import { Ionicons } from '@expo/vector-icons';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import ChatUI from './src/components/ChatUI';
import LoginUI from './src/components/LoginUI';
import navReducer from './src/reducers/navReducer';
import AppWithNavigationState from './src/components/AppNavigator';
import ImageBrowser from './src/components/ImageBrowser';
import rootReducer from './src/reducers';
import { fetchMessages, checkUserExists } from './src/actions';
import { Examples } from '@shoutem/ui';
//import { combineForms } from 'react-redux-form';
//const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        //loggerMiddleware
    )
);

const LoginOrChat = connect(
    (state) => ({
        authorized: state.user.authorized
    }))
    (({ authorized, dispatch }) => {
    if (authorized) {
        return (<AppWithNavigationState />);
    }else{
        dispatch(checkUserExists());
        return (<LoginUI />);
    }
});

export default class App extends React.Component {
  state = {
    fontsAreLoaded: false,
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    return (
        <Provider store={store}>
          <LoginOrChat />
        </Provider>
    );
  }
};
//          <AppWithNavigationState />
