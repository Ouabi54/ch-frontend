import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import React, { useMemo, useState, useContext, createContext } from 'react';

import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetUsersQuery, useGetFriendsQuery, useGetRequestsQuery } from '../features/users/usersApi';


const PollingContext = createContext();

export const usePolling = () => useContext(PollingContext);

export const PollingProvider = ({ children }) => {
  const [pollingEnabled, setPollingEnabled] = useState(false);
  const [socketInit, setSocketInit] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  // Connect to socket and listen for events
  if(!socketInit && currentUser) {
    const socket = io(import.meta.env.VITE_API_URL);

    socket.on('connect', () => {
      console.log('Connected:', socket.id);
    });
    
    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
    });
    
    socket.on(currentUser._id, (msg) => {
      switch(msg.type) {
        case 'NEW_FRIEND_REQUEST':
          toast.success(`${msg.email} sent you an invite!`);
          break;
        case 'ACCEPT_FRIEND_REQUEST':
          toast.success(`${msg.email} accepted your invite!`);
          break;
        default:
          // code block
      }
    });
    setSocketInit(true);
  }

  const { data: lastRequests, isLoading: isPollingRequestsLoading } = useGetRequestsQuery(undefined, {
    skip: !pollingEnabled,
    pollingInterval: 3000,
  });

  const { data: lastUsers, isLoading: isPollingUsersLoading } = useGetUsersQuery(undefined, {
    skip: !pollingEnabled,
    pollingInterval: 3000,
  }); 

  const { data: lastFriends, isLoading: isPollingFriendsLoading } =  useGetFriendsQuery(undefined, {
    skip: !pollingEnabled,
    pollingInterval: 3000,
  }); 

  const loading =  isPollingRequestsLoading || isPollingUsersLoading || isPollingFriendsLoading;

  const combinedData = useMemo(() => ({
    lastRequests,
    lastFriends,
    lastUsers,
  }), [lastRequests, lastFriends, lastUsers]);

  const startPolling = () => setPollingEnabled(true);
  const stopPolling = () => setPollingEnabled(false);

  const contextValue = useMemo(() => ({
    data: combinedData,
    loading,
    startPolling,
    stopPolling,
  }), [combinedData, loading]);

  return (
    <PollingContext.Provider value={contextValue}>
      {children}
    </PollingContext.Provider>
  );
};

PollingProvider.propTypes = {
    children: PropTypes.element
};
