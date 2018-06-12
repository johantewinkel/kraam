import React from 'react'

import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  CameraRoll,
  TouchableHighlight,
  Platform,
  Alert
} from 'react-native'

const { width, height } = Dimensions.get('window')
let styles

class ImageBrowser extends React.Component {
  static navigationOptions = {
    title: 'Images',
  }

  state = {
    images: [],
    loading: true,
    index:null,
    page: 1
  }

  componentDidMount() {
    this.fetchPhotos()
  }

  fetchPhotos = () => {
    console.log('width:', width );
    CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     }).then(r => {
       this.setState({ images: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
     this.forceUpdate();
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>Unsplash Images</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {
            this.state.images.map((image, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  onPress={() => this.setIndex(i)}
                  underlayColor='transparent'
                >
                  <Image
                    style={styles.image}
                    source={{ uri: image.urls.small }}
                  />
                </TouchableHighlight>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

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

export default ImageBrowser
