import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, {Text,TextInput, StyleSheet,CameraRoll, TouchableHighlight,   Dimensions,TouchableOpacity,Button, Image, ScrollView } from 'react-native';
import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageBrowser from '../components/ImageBrowser';
import Friends from '../containers/Friends';
import Input from '../containers/Input';
import { sendFriend, getFriends } from '../actions';
import { ImagePicker } from 'expo';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Friend from '../components/Friend';

const mapStateToProps = (state) => ({
    nav: state.navigation,
    user: state.user,
    kid: state.kid,
    friends: state.friends
});

const { width, height } = Dimensions.get('window')

class FriendsUI extends Component {
  static navigationOptions = {
    title: 'Wie helpen de kleine?',
  }
  constructor(props) {
    super(props);
    this.state = { firstname: null, lastname: null, gender: null, image: null, id: null };
    this.getFriends= this.getFriends.bind(this);
    this.addFriend=this.addFriend.bind(this);
  }

  componentDidMount(){
    this.getFriends();
  }

  getFriends = () =>{
    this.props.dispatch(getFriends(this.props.kid));
    console.log('Friends ', this.props.friends);
  }

  addFriend = () =>{
    this.props.navigation.navigate('Friend', {onSave: this.onSave});
  }

  onSave=(friend) =>{
    //console.log('fere', friend);
    this.props.dispatch(sendFriend(this.props.user, friend, this.props.kid));
  }

    render() {
      console.log('nav', this.props.navigation);
      return (
          <Screen>
                <KeyboardAwareScrollView ref="scroll"
                                       onLayout={this.onScrollViewLayout}>
                  <Friends nav1={this.props.navigation}/>
              </KeyboardAwareScrollView>
              <Button title="+" onPress={this.addFriend} />
          </Screen>
      )
    }
}

var styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});

export default connect(mapStateToProps)(FriendsUI);
