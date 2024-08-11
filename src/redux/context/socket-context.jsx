import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import React, { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { usePolling } from './polling-context';
import { selectCurrentUser } from '../features/auth/authSlice';
import { stopSocket, startSocket, selectSocketOpen } from '../features/socket/socketSlice';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { refetchAll } = usePolling();
  const dispatch = useDispatch();
  const socketOpen = useSelector(selectSocketOpen);
  const currentUser = useSelector(selectCurrentUser);
  const [socket, setSocket] = useState(null);

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
          case 'REJECT_FRIEND_REQUEST':
            toast.error(`${msg.email} rejected your invite!`);
            break;
          case 'CANCEL_FRIEND_REQUEST':
            toast.error(`${msg.email} canceled his invite!`);
            break;
          case 'DELETE_FRIEND':
            toast.error(`${msg.email} deleted friendship!`);
            break;
          default:
            // no default action
            break;
        }
        refetchAll();
      });

      // Return cleanup function
      return () => {
        socket.off('connect');
        socket.off('connect_error');
        socket.off(currentUser._id);
      };
    }

    return undefined;
  }, [socket, socketOpen, currentUser, refetchAll]);

  const startSocketConnection = useCallback(() => {
    dispatch(startSocket());
  }, [dispatch]);

  const stopSocketConnection = useCallback(() => {
    dispatch(stopSocket());
  }, [dispatch]);

  const contextValue = useMemo(() => ({
    startSocket: startSocketConnection,
    stopSocket: stopSocketConnection,
  }), [startSocketConnection, stopSocketConnection]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
