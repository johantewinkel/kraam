
import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';

import PictureSelect from './PictureSelect';
import ChatUI from './ChatUI';
import StartUI from './StartUI';
import KidUI from './KidUI';
import FriendsUI from './FriendsUI';
import Friend from './Friend';
import Schema from './Schema';

export const AppNavigator = StackNavigator({
    StartUI: { screen: StartUI },
    Schema: { screen: Schema},
    ChatUI: { screen: ChatUI },
    KidUI: { screen: KidUI },
    FriendsUI: {screen: FriendsUI},
    Friend: {screen: Friend},
    PictureSelect: {screen:PictureSelect}
  }, {initialRouteName: 'StartUI',});


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
