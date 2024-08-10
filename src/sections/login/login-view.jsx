import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Form, Formik, useFormik } from "formik";
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { useSocket } from 'src/redux/context/socket-context';
import { usePolling } from 'src/redux/context/polling-context';
import { useLoginMutation } from "src/redux/features/auth/authApi";

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6).max(12),
});


export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const { startPolling } = usePolling();
  const { startSocket } = useSocket();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      setLoading(true);
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      startPolling();
      startSocket();
      router.push("/");
    }
    if (error) {
      console.log(error);
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
    setLoading(false);
  }, [isSuccess, error, router, startPolling, startSocket]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const renderForm = (
    <Formik>
      <Form onSubmit={handleSubmit} >
        <Stack spacing={3} mb={2}>
          <TextField 
            name="email" 
            type="text" 
            onChange={handleChange} 
            label="Email address" 
            value={values.email}
            error={errors.email && touched.email}
          />
          <TextField
            name="password"
            label="Password"
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            error={errors.password && touched.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          loading={loading}
          disabled={loading}
        >
          Login
        </LoadingButton>
      </Form>
    </Formik>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Login</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link component={RouterLink} to="/signup"  variant="subtitle2" sx={{ ml: 0.5 }}>
              Signup
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
