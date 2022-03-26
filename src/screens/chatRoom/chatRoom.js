import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { socket } from '../../congif/web-socket';
import Header from '../../components/header/header';
import Messages from '../../components/messages/messages';
import { history } from '../../congif/network';
import {
  ChatContainer,
  StyledContainer,
  ChatBox,
  StyledButton,
  SendIcon
} from './styles';

function ChatRoom(props) {
    const {username, room, joinData } = props;
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if( Object.keys(joinData).length > 0) {
            setMessages([joinData])    
            socket.on('message', (message, error) => {
                setMessages(msgs => [ ...msgs, message ]);
            });
        } 
        else {
            history.push('/join')
        }
     }, [joinData])

       return (
        <ChatContainer>
            <Header room={room} />
            <StyledContainer>
                <ChatBox>
                    <Messages 
                        messages={messages} 
                        username={username}
                    />
                </ChatBox>      
            </StyledContainer>
        </ChatContainer>
    )
};
export default ChatRoom;