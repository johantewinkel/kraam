
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, {
  CameraRoll,
  TouchableHighlight,
  Button,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView } from 'react-native';

import { View, Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { sendMessage } from '../actions';
import { ImagePicker } from 'expo';

const { width, height } = Dimensions.get('window')
let styles

class PictureSelect extends Component {
    state = {
        images: [],
        pictureIndex: null,
    }

    handleButtonPress(pictureIndex){
      //console.log('Selected image: ', pictureIndex);
      if (pictureIndex === this.state.pictureIndex) {
        pictureIndex = null
      }
  //    this.setState({ pictureIndex })
      this.props.navigation.state.params.onSelect({pictureIndex: pictureIndex});
      this.props.navigation.goBack();
    }

    componentDidMount() {
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

    render() {
      return (
            <Screen>
                <Title styleName="h-center" style={{paddingTop: 20}}>
                    Select picture
                </Title>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollContainer}>
                   {this.state.images.map((p, i) => {
                   return (
                     <TouchableHighlight
                       key={i}
                       onPress={() => this.handleButtonPress(p.node.image)}
                       underlayColor='transparent'
                     >
                       <Image
                         key={i}
                         style={styles.image}
                         onPress={()=>this.handleButtonPress(i)}
                         source={{ uri: p.node.image.uri }}
                       />
                    </TouchableHighlight>
                   );
                 })}
                </ScrollView>
            </Screen>
        )
    }
}

const mapStateToProps = state => ({ });

styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  centerLoader: {
    height: height - 100,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: (width / 3), height: (width / 3)
  },
  title: {
    textAlign: 'center',
    padding: 20
  }
})

export default connect(mapStateToProps, {
    //pictureChanged,
})(PictureSelect);
