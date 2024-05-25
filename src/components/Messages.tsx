import React from 'react'
import ChatBody from './chat/chatBody/ChatBody';
import Nav from './chat/nav/Nav';
import { useNavigation } from 'react-router';
import Loading from './Loading';

const Messages = () => {
     const navigation = useNavigation();
  return (
    <div className="__main">
      {navigation.state == "loading" && <Loading></Loading>}
      <Nav />
      <ChatBody />
    </div>
  );
}

export default Messages