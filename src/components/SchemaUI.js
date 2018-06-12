import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, {Text,TextInput, StyleSheet,CameraRoll, TouchableHighlight,   Dimensions,TouchableOpacity,Button, Image, ScrollView } from 'react-native';
import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageBrowser from '../components/ImageBrowser';
import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

const mapStateToProps = state => ({ });

const { width, height } = Dimensions.get('window')
let firstname, lastname, gender, role;

class SchemaUI extends Component {
  static navigationOptions = {
    title: 'Schema',
  }

 constructor(props) {
    super(props);
    this.state = { firstname: null, lastname: null, gender: null, image: null, id: null };
 }

  sendFriend(){
    //console.log('Friend state:', this.props );
    this.props.navigation.state.params.onSave(this.state);
    this.props.navigation.goBack();
  }

  render() {
        return (
          <View>
            <TextInput
                    placeholder={'Voornaam'}
                    style={styles.input}
                    onChangeText={(firstname) => this.state.firstname=firstname}
                    //value={this.props.friend.firstname}
                    />
            <TextInput
                    placeholder={'Achternaam'}
                    style={styles.input}
                    onChangeText={(lastname) => this.state.lastname=lastname}
                    //value={this.props.friend.lastname}
                    />
            <TextInput
                    placeholder={'Geslacht'}
                    style={styles.input}
                    onChangeText={(gender) => this.state.gender=gender}
                    //value={this.props.friend.gender}
                    />
            <TextInput
                      placeholder={'Rol'}
                      style={styles.input}
                      onChangeText={(role) => this.state.role=role}
                      //value={this.props.friend.gender}
                      />
            <Button title="+" onPress={()=>this.sendFriend()} />

          </View>
        );
    }
}

styles = StyleSheet.create({
  input: {height: 40, borderColor: 'gray', borderWidth: 1}
})

export default connect(mapStateToProps)(SchemaUI);
