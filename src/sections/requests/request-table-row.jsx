import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import LoadingButton from '@mui/lab/LoadingButton';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useAcceptRequestMutation, useCancelRequestMutation, useRejectRequestMutation } from 'src/redux/features/users/usersApi';

// ----------------------------------------------------------------------

export default function RequestTableRow({
  status,
  id,
  sender,
  target,
  date,
  type
}) {

  const [cancelRequest, { isSuccess: isCancelRequestSuccess, error: cancelRequestError }] = useCancelRequestMutation();
  const [acceptRequest, { isSuccess: isAcceptRequestSuccess, error: acceptRequestError }] = useAcceptRequestMutation();
  const [rejectRequest, { isSuccess: isRejectRequestSuccess, error: rejectRequestError }] = useRejectRequestMutation();

  const [cancelRequestLoading, setCancelRequestLoading] = useState(false);
  const [acceptRequestLoading, setAcceptRequestLoading] = useState(false);
  const [rejectRequestLoading, setRejectRequestLoading] = useState(false);

  const onCancelRequestClick = async () => {
    setCancelRequestLoading(true);
    await cancelRequest({ requestId: id });
  }

  const onAcceptRequestClick = async () => {
    setAcceptRequestLoading(true);
    await acceptRequest({ requestId: id });
  }

  const onRejectRequestClick = async () => {
    setRejectRequestLoading(true);
    await rejectRequest({ requestId: id });
  }

  useEffect(() => {
    if (isRejectRequestSuccess) {
      toast.success("The request has been rejected!");
    }
    if (rejectRequestError) {
      if ("data" in rejectRequestError) {
        const errorData = rejectRequestError;
        toast.error(errorData.data.message);
      }
    }
    setTimeout(() => {
      setRejectRequestLoading(false);
    }, 3000);
  }, [isRejectRequestSuccess, rejectRequestError]);


  useEffect(() => {
    if (isAcceptRequestSuccess) {
      toast.success("The request has been accepted!");
    }
    if (acceptRequestError) {
      if ("data" in acceptRequestError) {
        const errorData = acceptRequestError;
        toast.error(errorData.data.message);
      }
    }
    setTimeout(() => {
      setAcceptRequestLoading(false);
    }, 3000);
  }, [isAcceptRequestSuccess, acceptRequestError]);

  useEffect(() => {
    if (isCancelRequestSuccess) {
      toast.success("The request has been canceled!");
    }
    if (cancelRequestError) {
      if ("data" in cancelRequestError) {
        const errorData = cancelRequestError;
        toast.error(errorData.data.message);
      }
    }
    setTimeout(() => {
      setCancelRequestLoading(false);
    }, 3000);
  }, [isCancelRequestSuccess, cancelRequestError]);


  const renderActions = () => {
    if(type === 'RECEIVED' && status === 'PENDING' && target === 'YOU')
    return (
      <ButtonGroup variant="contained" aria-label="Action">
        <LoadingButton loading={acceptRequestLoading} onClick={onAcceptRequestClick} variant="contained" color="success">
          Accept
        </LoadingButton>
        <LoadingButton loading={rejectRequestLoading} onClick={onRejectRequestClick} variant="contained" color="error">
          Reject
        </LoadingButton>
      </ButtonGroup>
    )
  if(type === 'SENT' && status === 'PENDING' && sender === 'YOU')
    return (
      <LoadingButton loading={cancelRequestLoading} onClick={onCancelRequestClick} variant="contained" color="error">
        Cancel
      </LoadingButton>);
    return (<> </>);
  };
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>{type}</TableCell>
      <TableCell>{sender}</TableCell>
      <TableCell>{target}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        {renderActions()}
      </TableCell>
    </TableRow>
  );
}

RequestTableRow.propTypes = {
  id: PropTypes.string,
  sender: PropTypes.string,
  target: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
};