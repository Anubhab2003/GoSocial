import { io } from 'socket.io-client';
import conf from './conf/conf';

const socket = io(conf.appwriteUrl);

export default socket;
