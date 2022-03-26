import io from 'socket.io-client';
let END_POINT;

END_POINT = 'http://localhost:3005';

export const socket = io(END_POINT, { transports : ['websocket'] });