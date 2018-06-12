
import React, { Component } from 'react';
import {
    ListView, Text, Row, Image,
    View, Subtitle, Caption, Heading
} from '@shoutem/ui';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';


const Message = ({ msg }) => (
    <Row>
    {msg.picture!=='' && msg.picture!=='retekekte' && <Image styleName="small-avatar top"
               source={{ uri: `data:image/gif;base64,${msg.picture}`}} />}
        <View styleName="vertical">
            <View styleName="horizontal space-between">
                <Subtitle>{msg.author.name}</Subtitle>
                <Caption>{moment(msg.time).from(Date.now())}</Caption>
                <Icon name="forward"  size={16} color="black" />
            </View>
            <Text styleName="multiline">{msg.text}</Text>
        </View>
    </Row>
);

const MessageList = ({ messages, onLayout }) => (
    <ListView data={messages}
              autoHideHeader={true}
              renderRow={(msg) => <Message msg={msg} />}
              onLayout={onLayout}
              />
);

export default MessageList;
