import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import JoinScreen from './screens/joinScreen/joinScreen';
import ChatRoom from './screens/chatRoom/chatRoom';
import { history } from '../src/congif/network';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joinData, setJoinData] = useState({});

  function onJoinSuccess(data) {
    setJoinData(data);
    setUsername(data.userData.username);
    setRoom(data.userData.room);
    history.push(`/chat/rooms/${data.userData.room}`);
  }
  return (
    <div className="App">
      <Switch>
        <Route
          path="/join"
          component={() => <JoinScreen onJoinSuccess={onJoinSuccess} />} />
        <Redirect
          from="/"
          to="/join"
          exact />
        <Route
          path="/chat/rooms/:roomNumber"
          component={() =>
            <ChatRoom
              username={username}
              room={room}
              joinData={joinData} />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
