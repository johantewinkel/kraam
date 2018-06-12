import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, {Text,TextInput, StyleSheet,CameraRoll, TouchableHighlight,   Dimensions,TouchableOpacity,Button, Image, ScrollView } from 'react-native';
import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageBrowser from '../components/ImageBrowser';
import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { createKid, getKiddo } from '../actions';
import { ImagePicker } from 'expo';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

const mapStateToProps = (state) => ({
    nav: state.navigation,
    user: state.user,
    kid: state.kid
});

const { width, height } = Dimensions.get('window')

class KidUI extends Component {
  static navigationOptions = {
    title: 'Wie is de topper?',
  }
  constructor(props) {
    super(props);
    this.state = { firstname: null, lastname: null, gender: null, image: null, id: null };
    this.updateKid= this.updateKid.bind(this);
    this.getKid= this.getKid.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }

  componentDidMount(){
    this.getKid();
  }

  getKid = () =>{
    this.props.dispatch(getKiddo(this.props.user));
    //this.setState({firstname: this.getKiddo(this.props.user).firstname});
  }

  updateKid =() => {
    //console.log('state =',this.state);
     createKid(this.state.firstname, this.state.lastname, this.state.gender, this.props.user, this.state.image, this.state.id )
     this.props.navigation.goBack();
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64:  true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
    });
    //console.log('imagepicked', result);
    if (!result.cancelled) {
      this.setState({ image: result.base64 });
    }
  }

    render() {
      let image=''//'file:///Users/johantewinkel/Library/Developer/CoreSimulator/Devices/CF1B6910-F9F2-4960-A3A7-464EF1E33866/data/Containers/Data/Application/48FE13C6-0F32-4045-8F52-98472EBB5CEE/Library/Caches/ExponentExperienceData/%2540johantewinkel%252Fkraamcommunity/ImagePicker/C71E619D-B099-4B49-AC8A-BC4824A6B504.jpg'
      if(this.props.kid.picture)
      {
        image = `data:image/gif;base64,${this.props.kid.picture}`;
        this.state.id=this.props.kid.id;
        this.state.firstname=this.props.kid.firstname;
        this.state.lastname=this.props.kid.lastname;
        this.state.gender=this.props.kid.gender;
        this.state.image=this.props.kid.picture;
      }
      if(this.state.image)
      {
        image = `data:image/gif;base64,${this.state.image}`;
      }
      //console.log('kom ik hier?', this.state.image);
        return (
          <View>
            <TextInput
                    placeholder={'Voornaam'}
                    style={styles.input}
                    onChangeText={(firstname) => this.state.firstname=firstname}
                    value={this.props.kid.firstname}
                    />
            <TextInput
                    placeholder={'Achternaam'}
                    style={styles.input}
                    onChangeText={(lastname) => this.state.lastname=lastname}
                    value={this.props.kid.lastname}
                    />
            <TextInput
                    placeholder={'Geslacht'}
                    style={styles.input}
                    onChangeText={(gender) => this.state.gender=gender}
                    value={this.props.kid.gender}
                    />
            {this.props.kid.picture!=='' && this.props.kid.picture!=='retekekte' && <Image styleName="small-avatar top"
                               source={{ uri: `data:image/gif;base64,${this.props.kid.picture}`}} />}
            {image!=='' && <Image style={{width: 50, height: 50}} source={{ uri:image}}/>}
            <TouchableOpacity onPress={this.pickImage} style={{width: 80, height: 30, backgroundColor: 'steelblue'}}>
                    <Text>Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.updateKid} style={{width: 80, height: 30, backgroundColor: 'steelblue'}}>
                    <Text>Opslaan</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

styles = StyleSheet.create({
  input: {height: 40, borderColor: 'gray', borderWidth: 1}
})

export default connect(mapStateToProps)(KidUI);
