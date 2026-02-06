import { useEffect, useState } from 'react';
import socketService from '../services/socket';

const useSocket = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = socketService.connect();

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socketService.disconnect();
        };
    }, []);

    const emit = (event, data) => {
        socketService.emit(event, data);
    };

    const on = (event, callback) => {
        socketService.on(event, callback);
    };

    return { isConnected, emit, on };
};

export default useSocket;
