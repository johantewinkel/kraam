
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, {CameraRoll, TouchableHighlight, Button, Image, ScrollView } from 'react-native';
import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageBrowser from '../components/ImageBrowser';
import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { sendMessage } from '../actions';
import { ImagePicker } from 'expo';
//import RNFetchBlob from 'react-native-fetch-blob';

const mapStateToProps = (state) => ({
    chatHeight: state.chatroom.meta.height,
    user: state.user
});

class ChatUI extends Component {
    static navigationOptions = {
      title: 'Lauries logboek',
    }

    constructor(props) {
      super(props);
      this.state = {
            scrollViewHeight: 0,
            inputHeight: 0,
            images: [],
            image:'',
            selected: '',
            pictureIndex: '',
      }
      this.handleButtonPress= this.handleButtonPress.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom(false);
        CameraRoll.getPhotos({
           first: 20,
           assetType: 'Photos',
         }).then(r => {
           this.setState({ images: r.edges });
         })
         .catch((err) => {
            //Error Loading Images
         });
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

    onSelect= pictureIndex => {
      //console.log('Picture selected:', pictureIndex);
      this.setState(pictureIndex);
      let message = 'data:image/png;base64, '+ pictureIndex.base64;
      //console.log('Picture message:', message);
        //Uploads the base64 to firebase as a raw string, with the specified metadata
        //this._imageUploadPath.child('Imag2').putString(message,"raw",metadata).then( () => console.log("done")).catch( (err) => console.log(err) ) ;

      //uploadImage(pictureIndex, 'image/jpeg', 'imageOne');
    };

    handleButtonPress(){
      CameraRoll.getPhotos({
         first: 20,
         assetType: 'Photos',
       }).then(r => {
         this.setState({ images: r.edges });
       })
       .catch((err) => {
          //Error Loading Images
       });
       //this.forceUpdate();
       this.props.navigation.navigate('PictureSelect', {onSelect: this.onSelect});
    }

    sendMessage = (text) => {
        let image = this.state.image;
        this.state.image = '';
        return sendMessage(text, this.props.user, image )
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onScrollViewLayout = (event) => {
        const layout = event.nativeEvent.layout;

        this.setState({
            scrollViewHeight: layout.height
        });
    }

    onInputLayout = (event) => {
        const layout = event.nativeEvent.layout;
        this.setState({
            inputHeight: layout.height
        });
    }

    scrollToBottom(animate = true) {
        const { scrollViewHeight, inputHeight } = this.state,
              { chatHeight } = this.props;

        const scrollTo = chatHeight - scrollViewHeight + inputHeight;

        if (scrollTo > 0) {
           this.refs.scroll.scrollToPosition(0, scrollTo, animate)
        }
    }

    scrollToInput(reactRef) {
        this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
    }

    render() {
        //console.log('state :', this.state)
        //let {image}  = this.state;
        //  console.log('image :', image)
        return (
            <Screen>
                  <KeyboardAwareScrollView ref="scroll"
                                         onLayout={this.onScrollViewLayout}>
                    <Messages props={this.props} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Input  image={this.state.image}
                              onLayout={this.onInputLayout}
                              onFocus={this.scrollToInput.bind(this)}
                              submitAction={this.sendMessage}
                              style = {{width:150}}
                              ref="input"
                              placeholder="Say something cool ..." />
                        <Button title="+" onPress={this.pickImage} />
                    </View>
                </KeyboardAwareScrollView>
            </Screen>
        )
    }
}
//  //{this.handleButtonPress}
export default connect(mapStateToProps)(ChatUI);
