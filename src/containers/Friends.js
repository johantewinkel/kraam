
import React from 'react';
import { connect } from 'react-redux';
import { View, Spinner } from '@shoutem/ui';

import FriendsList from '../components/FriendsList';

const mapStateToProps = (state) => ({
    friends: state.friends,
    nav: state.navigation
});

const Friends = connect(
    mapStateToProps
)(({ friends, dispatch, nav1 }) => {
        {console.log('navigator:', nav1)}
        return <FriendsList friends={friends} nav1={nav1}
                            style={{minHeight: 100}} />
});

export default Friends;
