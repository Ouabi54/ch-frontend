import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { usePolling } from 'src/redux/context/polling-context';
import { useLogoutMutation } from 'src/redux/features/auth/authApi';
import { selectCurrentUser } from 'src/redux/features/auth/authSlice';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { stopPolling } = usePolling();
  const [open, setOpen] = useState(null);

  const [logout, { isSuccess, error }] = useLogoutMutation();
  const router = useRouter();
  const currentUser = useSelector(selectCurrentUser);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = async () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    router.push("/login");
    stopPolling();
    await logout();
  };


  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout Successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, router]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >

          {currentUser.email.charAt(0).toUpperCase()}

      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser._id}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />



        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
