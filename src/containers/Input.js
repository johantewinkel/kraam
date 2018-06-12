
import React, { Component } from 'react';
import ReactNative, {CameraRoll, TouchableHighlight, Button, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { TextInput, View } from '@shoutem/ui';


class Input extends Component {
    state = {
        text: null
    }

    onChangeText = text => this.setState({text: text});

    onSubmitEditing = () => {
        this.props.dispatch(
            this.props.submitAction(this.state.text)
        );

        if (!this.props.noclear) {
            this.setState({
                text: null
            });
        }
    }

    onFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(this.refs.input);
        }
    }

    onBlur = () => {
        if (this.props.submitOnBlur) {
            this.onSubmitEditing();
        }
    }

    onLayout = (event) => {
        if (this.props.onLayout) {
            this.props.onLayout(event);
        }
    }

    render() {
        let image=''//'file:///Users/johantewinkel/Library/Developer/CoreSimulator/Devices/CF1B6910-F9F2-4960-A3A7-464EF1E33866/data/Containers/Data/Application/48FE13C6-0F32-4045-8F52-98472EBB5CEE/Library/Caches/ExponentExperienceData/%2540johantewinkel%252Fkraamcommunity/ImagePicker/C71E619D-B099-4B49-AC8A-BC4824A6B504.jpg'
        if(this.props.image)
        {
          image = `data:image/gif;base64,${this.props.image}`;
        }
        console.log('image', image);
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
            {image!=='' && <Image style={{width: 50, height: 50}} source={{ uri:image}}/>}
            <TextInput placeholder={this.props.placeholder}
                       onChangeText={this.onChangeText}
                       onSubmitEditing={this.onSubmitEditing}
                       onLayout={this.onLayout}
                       value={this.state.text}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       ref="input"/>
            </View>
        )
    }
}
//  {
//{image!=='' && <Image source={{ uri: `data:image/gif;base64,${image}`  }} style={{ width: 100, height: 100 }} />}

//    if(image){
//      console.log('testtest');
//      <Imagesource={{ uri: `data:image/gif;base64,${this.props.image}`  }} style={{ width: 100, height: 100 }} />
//    }
//  }


export default connect()(Input);
