
import React, { Component } from 'react';
import {
    ListView, Text, Row, Image,
    View, Subtitle, Caption, Heading
} from '@shoutem/ui';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import {Frnd} from './Frnd';


const Friend = ({ frnd, nav1 }) => (
    <Row>
    {frnd.picture!=='' && frnd.picture!=='retekekte' && <Image styleName="small-avatar top"
               source={{ uri: `data:image/gif;base64,${frnd.picture}`}} />}
        <View styleName="vertical">
            <View styleName="horizontal space-between">
                <Subtitle>{frnd.firstname} ({frnd.role})</Subtitle>
                <Icon name="forward"  size={16} color="black" onPress={()=>{ nav1.navigate('Friend', {})}} />
            </View>
            <Text styleName="multiline">{frnd.text}</Text>
        </View>
    </Row>
);

const FriendsList = ({ friends, nav1, onLayout }) => (
    <ListView data={friends}
              autoHideHeader={true}
              renderRow={friend => <Friend frnd={friend} nav1={nav1} />}
              onLayout={onLayout}
              onPress={()=>{console.log("clicked-2- data-->>",nav1)}}
              />
);

export default FriendsList;
