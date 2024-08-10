import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import React, { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { selectCurrentUser } from '../features/auth/authSlice';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketOpen, setSocketOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance = io(import.meta.env.VITE_API_URL, {
      autoConnect: false,
    });

    setSocket(socketInstance);

    return () => {
      // Clean up the socket connection on unmount
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket && socketOpen && currentUser?._id) {
      socket.open();

      socket.on('connect', () => {
        console.log('Connected:', socket.id);
      });

      socket.on('connect_error', (err) => {
        console.error('Connection Error:', err.message);
      });

      socket.on(currentUser._id, (msg) => {
        switch (msg.type) {
          case 'NEW_FRIEND_REQUEST':
            toast.success(`${msg.email} sent you an invite!`);
            break;
          case 'ACCEPT_FRIEND_REQUEST':
            toast.success(`${msg.email} accepted your invite!`);
            break;
          default:
            // no default action
            break;
        }
      });

      // Return cleanup function
      return () => {
        socket.off('connect');
        socket.off('connect_error');
        socket.off(currentUser._id);
      };
    }
    
    // Explicitly return undefined if the socket isn't open or currentUser is not defined
    return undefined;
  }, [socket, socketOpen, currentUser]);

  const startSocket = useCallback(() => setSocketOpen(true), []);
  const stopSocket = useCallback(() => setSocketOpen(false), []);

  const contextValue = useMemo(() => ({
    startSocket,
    stopSocket,
  }), [startSocket, stopSocket]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
