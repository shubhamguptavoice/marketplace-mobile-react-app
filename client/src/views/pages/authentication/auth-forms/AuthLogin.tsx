import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useConfig from 'hooks/useConfig';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/google.svg';
import BannerMessage from 'banner-message';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginRes = useSelector((state: any) => state?.authReducer?.login);
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { borderRadius } = useConfig();
    const [checked, setChecked] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const [msg, setMsg] = React.useState('');

    const { firebaseEmailPasswordSignIn, firebaseGoogleSignIn } = useAuth();
    const google = async () => {
        // try {
        //     await window.open('http://localhost:8001/api/google', '_self');
        // } catch (err) {
        //     console.error(err);
        // }
        window.open('http://localhost:8001/api/google', '_self');
    };

    const apple = () => {
        window.open('http://localhost:8001/auth/github', '_self');
    };

    const facebook = () => {
        window.open('http://localhost:8001/api/facebook', '_self');
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const isEmptyObject: any = (selector: any) => {
        return JSON.stringify(selector) === '{}';
    };
    React.useEffect(() => {
        if (loginRes === undefined) {
            return;
        }
        // alert('Hello Logged In');
        console.log('loginRes', loginRes);
    }, [loginRes]);

    React.useEffect(() => {
        if (isEmptyObject(loginRes)) {
            return;
        } else if (loginRes === undefined) {
            return;
        } else {
            localStorage.setItem('loginRes', JSON.stringify(loginRes));
            if (loginRes?.status === '201' && loginRes?.user[0]?.role === 0) {
                setSeverity('success');
                setMsg('You as a buyer Logged In successfully');
                setOpen(true);
                let timing = setInterval(() => {
                    navigate('/buy-products');
                }, 5000);
                return () => {
                    clearInterval(timing);
                };
            } else if (loginRes?.status === '201' && loginRes?.user[0]?.role === 1) {
                setSeverity('success');
                setMsg('You as a seller Logged In successfully');
                setOpen(true);
                let timing = setInterval(() => {
                    navigate('/listed-products');
                }, 5000);
                return () => {
                    clearInterval(timing);
                };
            } else if (loginRes?.status === '400') {
                setSeverity('error');
                setMsg('You have entered wrong password');
                setOpen(true);
                let timing = setInterval(() => {
                    //   setIsloading(!isLoading);
                    navigate('/login');
                }, 5000);
                return () => {
                    clearInterval(timing);
                };
            } else if (loginRes.status === '309') {
                setSeverity('info');
                setMsg('User not registered please sign up');
                setOpen(true);
                let timing = setInterval(() => {
                    //   setIsloading(!isLoading);
                    navigate('/login');
                }, 5000);
                return () => {
                    clearInterval(timing);
                };
            }
        }
    }, [loginRes]);

    let handleLogin = async (values: any) => {
        // saga dispatch
        // setIsloading(!isLoading);
        // let items={(values.email), values.password}
        dispatch({ type: 'SIGN_IN_USER', payload: values });
    };

    return (
        <>
            <BannerMessage open={open} onClose={handleClose} severity={severity} msg={msg} />
            <Grid container direction="column" justifyContent="center" spacing={2}>
                {/* ================ || Login With Google ||=============== */}
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={google}
                            size="large"
                            variant="outlined"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ display: 'flex', mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign in with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                {/* ======================= || Facebook Login || ==================== */}

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={facebook}
                            size="large"
                            variant="outlined"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ display: 'flex', mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img
                                    src="https://d19rpgkrjeba2z.cloudfront.net/static/gen/1b50753b8452580def5c.svg"
                                    alt="google"
                                    width={16}
                                    height={16}
                                    style={{ marginRight: matchDownSM ? 8 : 16 }}
                                />
                            </Box>
                            Sign in with Facebook
                        </Button>
                    </AnimateButton>
                </Grid>
                {/* ======================= || Apple Login || =======================*/}
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            onClick={apple}
                            size="large"
                            variant="outlined"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ display: 'flex', mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img
                                    src="https://d19rpgkrjeba2z.cloudfront.net/static/gen/ac8579fdc87804afe253.svg"
                                    alt="google"
                                    width={16}
                                    height={16}
                                    style={{ marginRight: matchDownSM ? 8 : 16 }}
                                />
                            </Box>
                            Sign in with Apple
                        </Button>
                    </AnimateButton>
                </Grid>

                {/* ========================= || || ===================================*/}
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? `${theme.palette.dark.light + 20} !important`
                                        : `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>

                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* 
 email: 'info@codedthemes.com',
                    password: '123456',
*/}
            <Formik
                initialValues={{
                    email: 's@gmail.com',
                    password: '123'
                    // submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    dispatch({ type: 'SIGN_IN_USER', payload: values });
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to={
                                    loginProp
                                        ? `/pages/forgot-password/forgot-password${loginProp}`
                                        : '/pages/forgot-password/forgot-password3'
                                }
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {/* {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )} */}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;
