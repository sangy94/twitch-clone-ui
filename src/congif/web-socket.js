import io from 'socket.io-client';
let STRAPI_ENDPOINT;

STRAPI_ENDPOINT = 'http://localhost:3005';

export const socket = io(STRAPI_ENDPOINT);