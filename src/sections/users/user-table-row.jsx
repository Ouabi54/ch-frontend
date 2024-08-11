import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import LoadingButton from '@mui/lab/LoadingButton';

 import { useSendRequestMutation, useRemoveFriendMutation } from 'src/redux/features/users/usersApi';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function UserTableRow({
  email,
  id,
  isFriend,
  isSendDisabled
}) {
  const [sendRequest, { isSuccess: isSendRequestSuccess, error: sendRequestError }] = useSendRequestMutation();
  const [removeFriend, { isSuccess: isRemoveFriendSuccess, error: removeFriendError }] = useRemoveFriendMutation();
  const [sendRequestLoading, setSendRequestLoading] = useState(false);
  const [removeFriendLoading, setRemoveFriendLoading] = useState(false);

  const onSendRequestClick = async () => {
    setSendRequestLoading(true);
    await sendRequest({ targetId: id });
  }

  const onRemoveFriendClick = async () => {
    setRemoveFriendLoading(true);
    await removeFriend({ targetId: id });
  }

  useEffect(() => {
    if (isRemoveFriendSuccess) {
      toast.success("Friend has been removed!");
    }
    if (removeFriendError) {
      if ("data" in removeFriendError) {
        const errorData = removeFriendError;
        toast.error(errorData.data.message);
      }
    }
    setTimeout(() => {
      setRemoveFriendLoading(false);
    }, 3000);
  }, [isRemoveFriendSuccess, removeFriendError]);

  useEffect(() => {
    if (isSendRequestSuccess) {
      toast.success("The request has been sent!");
    }
    if (sendRequestError) {
      if ("data" in sendRequestError) {
        const errorData = sendRequestError;
        toast.error(errorData.data.message);
      }
    }
    setTimeout(() => {
      setSendRequestLoading(false);
    }, 3000);
  }, [isSendRequestSuccess, sendRequestError]);

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell>{id}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>
          <Label color={isFriend ? 'success' : 'error'}>
            {isFriend ? 'Friend' : 'Not friend'}
          </Label>
        </TableCell>

        <TableCell>
          {
            isFriend ? 
              <LoadingButton style={{minWidth:125}} onClick={onRemoveFriendClick} loading={removeFriendLoading}  variant="contained" color='error'>
                Delete
              </LoadingButton>
            : 
            <LoadingButton style={{minWidth:125}} onClick={onSendRequestClick} loading={sendRequestLoading} variant="contained" color="success" disabled={isSendDisabled}>
              Send request
            </LoadingButton>
          }
        </TableCell>
      </TableRow>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string,
  email: PropTypes.any,
  isFriend: PropTypes.bool,
  isSendDisabled: PropTypes.bool
};
