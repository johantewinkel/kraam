import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, {Text, CameraRoll, TouchableHighlight,   Dimensions,TouchableOpacity,Button, ScrollView } from 'react-native';
import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageBrowser from '../components/ImageBrowser';
import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { sendMessage } from '../actions';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import {  Image } from '@shoutem/ui';
import { getKiddo } from '../actions';

const mapStateToProps = (state) => ({
    authorizing: state.user.navigation,
    user: state.user,
    kid: state.kid
});

const { width, height } = Dimensions.get('window')

class StartUI extends Component {
  static navigationOptions = {
    title: 'Wat wil je doen?',
  }
  constructor(props) {
    super(props);
    this.openChat= this.openChat.bind(this);
    this.openKid= this.openKid.bind(this);
    this.openSchema= this.openSchema.bind(this);
    this.getKidPicture= this.getKidPicture.bind(this);
    this.openFriends= this.openFriends.bind(this);
  }

  componentDidMount(){
    this.getKidPicture();
  }

  getKidPicture = () =>{
    this.props.dispatch(getKiddo(this.props.user));
    //this.setState({firstname: this.getKiddo(this.props.user).firstname});
  }

  openChat(){
     this.props.navigation.navigate('ChatUI', {});
  }

  openSchema(){
     this.props.navigation.navigate('Schema', {});
  }

  openKid(){
     this.props.navigation.navigate('KidUI', {});
  }

  openFriends(){
     this.props.navigation.navigate('FriendsUI', {});
  }

    render() {
      let image=''//'file:///Users/johantewinkel/Library/Developer/CoreSimulator/Devices/CF1B6910-F9F2-4960-A3A7-464EF1E33866/data/Containers/Data/Application/48FE13C6-0F32-4045-8F52-98472EBB5CEE/Library/Caches/ExponentExperienceData/%2540johantewinkel%252Fkraamcommunity/ImagePicker/C71E619D-B099-4B49-AC8A-BC4824A6B504.jpg'
      if(this.props.kid.picture)
      {
        image = `data:image/gif;base64,${this.props.kid.picture}`;
      }
        return (
          <View>
            <View style={{alignItems: 'center',}}>
              <TouchableOpacity onPress={this.openKid} >
                {image!=='' && <Image styleName="medium-avatar" source={{ uri:image}} onPress={this.openKid} />}
              </TouchableOpacity>
            </View>
            <View style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <TouchableOpacity onPress={this.openKid} style={{width: (width/3)-10, height: (width/3)-10, backgroundColor: 'steelblue'}}>
                    <Text>Kid</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.openFriends} style={{width: (width/3)-10, height: (width/3)-10, backgroundColor: 'powderblue'}}>
                    <Text>Vriendjes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.openSchema} style={{width: (width/3)-10, height: (width/3)-10, backgroundColor: 'skyblue'}}>
                  <Text>Schema</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.openChat} style={{width: (width/3)-10, height: (width/3)-10, backgroundColor: 'powderblue'}}>
                      <Text>Updates</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.openChat} style={{width: (width/3)-10, height: (width/3)-10, backgroundColor: 'skyblue'}}>
                        <Text>Hulp</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.openChat} style={{width: (width/3)-10, height: (width/3)-10, backgroundColor: 'steelblue'}}>
                        <Text>Helpen</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}

export default connect(mapStateToProps)(StartUI);
