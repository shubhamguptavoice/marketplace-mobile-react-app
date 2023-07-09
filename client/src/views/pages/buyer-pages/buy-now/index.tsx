import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Grid, Box, Avatar, AppBar, Toolbar, Button, Paper, Stack, Typography, Rating, Divider, Modal, Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useLocation, useNavigate } from 'react-router-dom';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InputAdornment from '@mui/material/InputAdornment';
import PaymentIcon from '@mui/icons-material/Payment';
// import * as React from 'react';
// import dayjs, { Dayjs } from "dayjs";
// import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Fade } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const BuyNow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [pickUpReturn, setpickUpReturn] = useState('');
    const [value, setValue] = React.useState<number | null>(4);
    const [open, setOpen] = React.useState(false);
    const [getReviews, setReviews] = useState([]);

    const [timeDifference, setTimeDifference] = React.useState(0);
    const [price, setPrice] = React.useState(Number(location.state.values.price));
    const [todayDate, setTodayDate] = React.useState('2023-01-01');
    const [dateStartValue, setDateStartvalue] = React.useState('2023-01-01');
    const [dateStartMS, setDateStartMS] = React.useState(0);
    const [timeStartValue, setTimeStartvalue] = React.useState('00:00');
    const [timeStartMS, setTimeStartMS] = React.useState(0);

    const [dateEndValue, setDateEndvalue] = React.useState('2023-01-01');
    const [dateEndMS, setDateEndMS] = React.useState(0);
    const [timeEndValue, setTimeEndvalue] = React.useState('00:00');
    const [timeEndMS, setTimeEndMS] = React.useState(0);
    const [cancellationDate, setCancellationDate] = React.useState('');
    const [freeMSG, setFreeMSG] = React.useState('');
    const [paidMSG, setPaidMSG] = React.useState('');
    const [paidPRICE, setPaidPRICE] = React.useState(0);
    const [getStripe, setStripe] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleStartDateChange = (event: any) => {
        var d1 = new Date(event.target.value);
        let d11 = d1.getTime();
        setDateStartvalue(event.target.value);
        setDateStartMS(d11);
    };

    const handleStartTimeChange = (event: any) => {
        const milliseconds = (h: any, m: any, s: any) => (h * 60 * 60 + m * 60 + s) * 1000;
        let time = event.target.value;
        let timeParts = time.split(':');
        let result = milliseconds(timeParts[0], timeParts[1], 0);
        setTimeStartvalue(event.target.value);
        setTimeStartMS(result);
    };

    const handleEndDateChange = (event: any) => {
        var d2 = new Date(event.target.value);
        let d22 = d2.getTime();
        setDateEndvalue(event.target.value);
        setDateEndMS(d22);
    };
    const handleEndTimeChange = (event: any) => {
        const milliseconds = (h: any, m: any, s: any) => (h * 60 * 60 + m * 60 + s) * 1000;
        let time = event.target.value;
        let timeParts = time.split(':');
        let result = milliseconds(timeParts[0], timeParts[1], 0);
        setTimeEndvalue(event.target.value);
        setTimeEndMS(result);
    };
    useEffect(() => {
        let prevTime = dateStartMS + timeStartMS;
        let afterTime = dateEndMS + timeEndMS;
        let timeDiff = afterTime - prevTime;
        let totaldays = timeDiff / 86400000;

        let totalCharged = price * totaldays;

        //=================|| Free Cancellation ||==================//
        // var dateStr = '2019-01-01';
        var adddays = 1;

        var result = new Date(new Date(dateStartValue).setDate(new Date(dateStartValue).getDate() + adddays));
        var trimmed_date = result.toISOString().substr(0, 10);
        setCancellationDate(trimmed_date);
        console.log('trimmed_date>>>>', trimmed_date);
        //=========================================================//

        if (totalCharged !== 0) {
            setPaidPRICE(totalCharged);
            setPaidMSG(`You will have to pay charged  `);
            return;
        }
    }, [dateStartMS, dateEndMS, timeStartMS, timeEndMS]);
    const handleContinue = () => {
        setOpen(true);
    };

    const handlePayment = () => {
        setStripe(!getStripe);

        navigate('/stripe-pay');
    };
    useEffect(() => {
        const genRandomKey = () => {
            fetch(`http://localhost:8001/api/rating-single-product/${location.state.values._id}`)
                .then(async (response) => setReviews(await response.json()))

                .catch((error) => console.log('error', error));
        };

        genRandomKey();
    }, []);
    console.log('location>>>ss', location);
    useEffect(() => {
        var currentdate = new Date();
        // var todayDatee = currentdate.getDate() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getFullYear();
        var todayDatee =
            currentdate.getFullYear() +
            '-' +
            (currentdate.getMonth() + 1 <= 9 ? 0 + currentdate.getMonth() + 1 : currentdate.getMonth() + 1) +
            '-' +
            currentdate.getDate();
        setTodayDate(todayDatee);
        console.log('todayDatee', todayDatee);
    }, []);
    console.log(
        'location.state.values.to_date>>',
        location.state.values.to_date,
        new Date(location.state.values.to_date).valueOf(),
        { todayDate },
        new Date(todayDate).valueOf()
    );
    const OutOfStock = () => {
        let valueOfToDate = new Date(location.state.values.to_date).valueOf();
        let valueOfToday = new Date(todayDate).valueOf();

        console.log('valueOfToDate>>', valueOfToDate, 'valueOfToday>>', valueOfToday);

        if (valueOfToday < valueOfToDate) {
            return `This item will be available from ${todayDate} to ${location.state.values.to_date}`;
        } else {
            return `Out of Stock`;
        }
    };

    return (
        <>
            <MainCard title="Product Summary Page">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={7}>
                            <Grid item xs={12}>
                                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <strong style={{ color: '#673ab7' }}>{location.state.values.name}</strong>
                                </h3>
                                <div className="slide-container">
                                    <Fade>
                                        {location.state.values.img_name.map((fadeImage: any, index: any) => (
                                            <div className="each-fade" key={index}>
                                                <div className="image-container">
                                                    <img
                                                        alt="slider pics"
                                                        src={`http://localhost:8001/images/${fadeImage}`}
                                                        width="95%"
                                                        height={350}
                                                    />
                                                </div>
                                                <h6 style={{ textAlign: 'center' }}>{fadeImage.caption}</h6>
                                            </div>
                                        ))}
                                    </Fade>
                                </div>
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '20px', marginLeft: '10px' }}>
                                <strong style={{ color: '#673ab7' }}>Discription:</strong>{' '}
                                <strong>{location.state.values.discription}</strong>
                            </Grid>
                            <Grid sx={{ marginTop: '20px', marginLeft: '10px' }}>
                                <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                                    <strong style={{ color: '#673ab7' }}>Ratings & Reviews:</strong>
                                </Grid>

                                {/* =====================Rating API================ */}

                                {getReviews.map((item: any, index) => {
                                    return (
                                        <>
                                            <Grid container spacing={2}>
                                                <Grid item xs={2} md={1}>
                                                    <Avatar src="https://ichef.bbci.co.uk/news/976/cpsprodpb/AF4A/production/_126247844_jackwoodley.jpg" />
                                                </Grid>
                                                <Grid item xs={10} md={11}>
                                                    <Grid item xs={12} md={12}>
                                                        <Rating name="half-rating-read" value={item.ratings} precision={0.5} readOnly />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <strong>{item.review}</strong>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    );
                                })}
                            </Grid>
                        </Grid>

                        <Grid item xs={0.3} md={0.3}>
                            <Divider variant="fullWidth" className="custom_divider" orientation="vertical" />
                        </Grid>
                        <Grid item xs={12} md={4.7} lg={4.7}>
                            <Grid item xs={12}>
                                <Divider orientation="horizontal" sx={{ marginTop: '20px', marginBottom: '20px' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <strong>${price} x 1 day</strong>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Divider orientation="horizontal" sx={{ marginTop: '20px', marginBottom: '20px' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <strong style={{ color: 'green' }}>{OutOfStock()}</strong>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Divider orientation="horizontal" sx={{ marginTop: '20px', marginBottom: '20px' }} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <strong style={{ color: '#673ab7' }}>Start Date</strong>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <Grid item xs={6} md={6}>
                                    <input
                                        type="date"
                                        placeholder="yyyy-mm-dd"
                                        value={dateStartValue}
                                        id="outlined-basic"
                                        onChange={handleStartDateChange}
                                        min="2023-01-01"
                                        max="2030-12-31"
                                    />
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <input type="time" value={timeStartValue} id="outlined-basic" onChange={handleStartTimeChange} />
                                </Grid>
                                <Grid item xs={2} md={4}></Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider orientation="horizontal" sx={{ marginTop: '20px', marginBottom: '20px' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <strong style={{ color: '#673ab7' }}>End Date</strong>
                            </Grid>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                <Grid item xs={6}>
                                    <input
                                        type="date"
                                        placeholder="yyyy-mm-dd"
                                        value={dateEndValue}
                                        id="outlined-basic"
                                        onChange={handleEndDateChange}
                                        min="2023-01-01"
                                        max="2030-12-31"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <input type="time" value={timeEndValue} id="outlined-basic" onChange={handleEndTimeChange} />
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider orientation="horizontal" sx={{ marginTop: '20px', marginBottom: '20px' }} />
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                {paidPRICE !== 0 && paidPRICE > 0 ? (
                                    <Alert severity="success">
                                        <strong>
                                            {paidMSG}${paidPRICE}
                                            <br />
                                            Free Cancellation till {cancellationDate}
                                        </strong>
                                    </Alert>
                                ) : (
                                    <></>
                                )}
                            </Grid>

                            {paidPRICE !== 0 && paidPRICE > 0 ? (
                                <Grid item xs={12}>
                                    <Divider orientation="horizontal" sx={{ marginTop: '20px', marginBottom: '20px' }} />
                                </Grid>
                            ) : (
                                <></>
                            )}
                            <Grid item xs={12} md={12}>
                                <strong style={{ color: '#673ab7' }}>Pickup & Return Location</strong>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    fullWidth={true}
                                    sx={{ m: 1, minWidth: 120 }}
                                    style={{ marginTop: '20px', marginBottom: '20px' }}
                                    size="small"
                                >
                                    <InputLabel id="demo-select-small">Pickup & Return Location</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={pickUpReturn}
                                        label="Pickup & Return Location"
                                        // onChange={handleDateChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                {/* <Button
                                    variant="contained"
                                    style={{ marginBottom: '20px' }}
                                    className="continue_btn"
                                    fullWidth={true}
                                    onClick={handleContinue}
                                    // onClick={handleOpen}
                                >
                                    <b>Continue</b>
                                </Button> */}
                                {/* ============ */}

                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            // disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleContinue}
                                        >
                                            Continue
                                        </Button>
                                    </AnimateButton>
                                </Box>

                                {/* ============== */}
                                <div>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Cancellation Information
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                {freeMSG}

                                                {paidMSG}
                                            </Typography>
                                            <Grid container item spacing={2}>
                                                <Grid item xs={6}></Grid>
                                                <Grid item xs={6}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<PaymentIcon />}
                                                        style={{ marginBottom: '20px' }}
                                                        className="continue_btn"
                                                        fullWidth={true}
                                                        onClick={handlePayment}
                                                    >
                                                        <b>Pay Now</b>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Modal>
                                </div>
                            </Grid>
                            <Grid container item spacing={2}>
                                <Grid item xs={12}>
                                    {/* <Button
                                        variant="contained"
                                        startIcon={<FavoriteBorderIcon />}
                                        style={{ marginBottom: '20px' }}
                                        className="continue_btn"
                                        fullWidth={true}
                                    >
                                        <b>Add to Favorite</b>
                                    </Button> */}
                                    {/* ============ */}

                                    <Box sx={{ mt: 2 }}>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                // disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<StarHalfIcon />}
                                                onClick={() => navigate('/ratings-reviews', { state: location.state.values })}
                                            >
                                                Rate Product
                                            </Button>
                                        </AnimateButton>
                                    </Box>

                                    {/* ============== */}
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <Button
                                        sx={{ marginTop: 5, marginLeft: 5 }}
                                        variant="contained"
                                        startIcon={<StarHalfIcon />}
                                        onClick={() => navigate('/ratings-reviews', { state: location.state.values })}
                                        // onClick={() => console.log('data for ratings Hi', location.state.values)}
                                    >
                                        <b>Rate Product</b>
                                    </Button>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
        </>
    );
};
export default BuyNow;
