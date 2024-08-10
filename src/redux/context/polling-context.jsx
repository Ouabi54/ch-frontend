import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import React, { useMemo, useState, useContext, createContext } from 'react';

import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetUsersQuery, useGetFriendsQuery, useGetRequestsQuery } from '../features/users/usersApi';


const PollingContext = createContext();


export const usePolling = () => useContext(PollingContext);

export const PollingProvider = ({ children }) => {
  const [pollingEnabled, setPollingEnabled] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const { data: lastRequests, isLoading: isPollingRequestsLoading } = useGetRequestsQuery(undefined, {
    skip: !pollingEnabled || !currentUser,
    pollingInterval: 3000,
  });

  const { data: lastUsers, isLoading: isPollingUsersLoading } = useGetUsersQuery(undefined, {
    skip: !pollingEnabled || !currentUser,
    pollingInterval: 3000,
  }); 

  const { data: lastFriends, isLoading: isPollingFriendsLoading } =  useGetFriendsQuery(undefined, {
    skip: !pollingEnabled || !currentUser,
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
