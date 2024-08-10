import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import React, { useMemo, useContext, createContext } from 'react';

import { selectCurrentUser } from '../features/auth/authSlice';
import { stopPolling, startPolling, selectPollingEnabled } from '../features/polling/pollingSlice';
import { useGetUsersQuery, useGetFriendsQuery, useGetRequestsQuery } from '../features/users/usersApi';

const PollingContext = createContext();

export const usePolling = () => useContext(PollingContext);

export const PollingProvider = ({ children }) => {
  const dispatch = useDispatch();
  const pollingEnabled = useSelector(selectPollingEnabled);
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

  const contextValue = useMemo(() => ({
    data: combinedData,
    loading,
    startPolling: () => dispatch(startPolling()),
    stopPolling: () => dispatch(stopPolling()),
  }), [combinedData, loading, dispatch]);

  return (
    <PollingContext.Provider value={contextValue}>
      {children}
    </PollingContext.Provider>
  );
};

PollingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
