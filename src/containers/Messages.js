
import React from 'react';
import { connect } from 'react-redux';
import { View, Spinner } from '@shoutem/ui';

import MessageList from '../components/MessageList';
import { updateMessagesHeight } from '../actions';

const mapStateToProps = (state) => ({
    messages: state.chatroom.messages,
    isFetching: state.chatroom.meta.isFetching,
    nav: state.navigation
});

const Messages = connect(
    mapStateToProps
)(({ messages, isFetching, nav, dispatch }) => {
    if (isFetching) {
        return (
            <View style={{paddingTop: 50,
                          paddingBottom: 50}}>
                <Spinner />
            </View>
        )
    }else{
      console.log('this', this.state)
        return <MessageList messages={messages}
                            style={{minHeight: 100}}
                            onLayout={(event) => dispatch(updateMessagesHeight(event))} />
    }
});

export default Messages;
