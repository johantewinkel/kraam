
import React, { Component } from 'react';
import {
    ListView, Text, Row, Image,
    View, Subtitle, Caption, Heading
} from '@shoutem/ui';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    nav: state.navigation,
    user: state.user,
    kid: state.kid,
    friends: state.friends
});

class Frnd extends Component {
  constructor(props) {
     super(props);
  }

  render(){
    console.log('friends', this.props);
    return
     (
       <Text>test</Text>
    );
  }
}

const FriendsList = ({ friends, onLayout }) => (
    <ListView data={friends}
              autoHideHeader={true}
              renderRow={friend => <Frnd frnd={friend} />}
              onLayout={onLayout}
              />
);

export default connect(mapStateToProps)(Frnd);
