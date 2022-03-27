import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { socket } from '../../congif/web-socket';
import Header from '../../components/header/header';
import Messages from '../../components/messages/messages';
import { history } from '../../congif/network';
import List from '../../components/list/list';
import {
    ChatContainer,
    StyledContainer,
    ChatBox,
    StyledButton,
    SendIcon
} from './styles';
import { Input, Button } from 'antd';

function ChatRoom(props) {
    const { username, room, joinData } = props;
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        if (Object.keys(joinData).length > 0) {
            setMessages([joinData])
            socket.on('message', (message, error) => {
                setMessages(msgs => [...msgs, message]);
            });
            socket.on("roomInfo", (users) => {
                setUsers(users);
            });
        }
        else {
            history.push('/join')
        }
    }, [joinData])

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleClick = (e) => {
        sendMessage(message);
    }

    const sendMessage = (message) => {
        if (message) {
            socket.emit('sendMessage', { userId: joinData.userData.id, message }, (error) => {
                if (error) {
                    alert(error)
                    history.push('/join');
                }
            });
            setMessage('')
        } else {
            alert("Message can't be empty")
        }
    }

    return (
        <ChatContainer>
            <Header room={room} />
            <StyledContainer>
                <ChatBox>
                    <Messages
                        messages={messages}
                        username={username}
                    />

                    <Input
                        type="text"
                        placeholder="Type your message"
                        value={message}
                        onChange={handleChange}
                    />
                    <StyledButton
                        onClick={handleClick}
                    >
                        <SendIcon>
                            <i className="fa fa-paper-plane" />
                        </SendIcon>
                    </StyledButton>
                </ChatBox>
                <List users={users.users}/>
            </StyledContainer>
        </ChatContainer>
    )
};
export default ChatRoom;