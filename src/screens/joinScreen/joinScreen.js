import React, { useState } from "react";
import styled from 'styled-components';
import { Input, Card, Button } from 'antd';
import { socket } from '../../congif/web-socket';

function JoinScreen(props) {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [error, setError] = useState('');

    const onUsernameChange = (e) => {
        const inputValue = e.target.value;
        setUsername(inputValue);
    }

    const onRoomChange = (e) => {
        const roomNo = e.target.value;
        setRoom(roomNo);
    }

    socket.on('welcome', (data) => {
        console.log("Welcome event inside Join screen", data);
        props.onJoinSuccess(data);
    });

    const onClick = () => {
        if(username && room) {
            socket.emit('join', { username, room }, (error) => {
                if(error) {
                    setError(error)
                    alert(error);
                } else {
                    socket.on('welcome', (data) => {
                        props.onJoinSuccess(data);
                    });
                }
            }); 
        }
    }

    return (
        <StyledCard>
            <label htmlFor="username">
                Enter your name
                <Input
                    name="username"
                    placeholder="Enter your username"
                    maxLength={25}
                    value={username}
                    onChange={onUsernameChange}
                />
            </label>
            <label htmlFor="room">
                Enter room number of your choice
                <Input
                    name="room"
                    placeholder="Enter your room number"
                    maxLength={25}
                    value={room}
                    onChange={onRoomChange}
                />
            </label>
            <StyledButton 
                type="primary" 
                size={"large"}
                onClick={onClick} >
                Join the Chat Room
            </StyledButton>
        </StyledCard>
    )

}

const StyledCard = styled(Card)`
    width: 581px;
    height: 210px;
    margin: 30vh auto;
    box-shadow: 2px 3px 3px 2.8px #d7d7e4;
    text-align: center;
`
const StyledButton = styled(Button)`
    margin-top: 10px;
`

export default JoinScreen;