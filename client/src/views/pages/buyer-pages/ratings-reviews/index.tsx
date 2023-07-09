import * as React from 'react';
import { useSelector } from 'react-redux';
import { Box, AppBar, Toolbar, Avatar, Paper, Typography, Grid, Rating, TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useLocation, useNavigate } from 'react-router-dom';
import BannerMessage from 'banner-message';
// import './Ratings.css';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+'
};

function getLabelText(value: any) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const RatingsReviewa = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user_id = useSelector((state: any) => state?.authReducer?.login?.user[0]?._id);
    const user_name = useSelector((state: any) => state?.authReducer?.login?.user[0]?.fname);

    console.log('user_id', user_id, 'user_name', user_name);

    const [value, setValue] = React.useState<number | null>(2);
    const [itemReview, setItemReview] = React.useState<string>('');
    const [CountItemReview, setCountItemReview] = React.useState(0);

    const [hover, setHover] = React.useState(-1);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const [msg, setMsg] = React.useState('');
    // const [msgCountChar, setMsgCountChar] = React.useState('');

    var values = location.state;

    console.log('item ratings', values);

    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            user_id: user_id,
            product_id: location.state._id,
            name: location.state.name,
            review: itemReview,
            ratings: value,
            seller_id: location.state.seller_id,
            user_name: user_name
        });

        var requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch('http://localhost:8001/api/rating-products', requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    setSeverity('success');
                    setMsg('Rating & review submitted successfully');
                    setOpen(true);
                    let timing = setInterval(() => {
                        navigate('/product-sammary-page', { state: { values } });
                    }, 5000);
                    return () => {
                        clearInterval(timing);
                    };
                }
            })

            .catch((error) => console.log('error', error));
    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleItemReview = (e: any) => {
        let val = e.target.value;
        setItemReview(val);
        if (val.length !== undefined) {
            let len = val.length;
            if (len >= 128) {
                setSeverity('warning');
                setMsg('You reached max allowed character is 128');
                setOpen(true);
                let timing = setInterval(() => {}, 5000);
                return () => {
                    clearInterval(timing);
                };
            }
        }
        setCountItemReview(e.target.value.length);
    };
    return (
        <>
            <MainCard title="Ratings & Reviews">
                <Box sx={{ flexGrow: 1 }}>
                    <BannerMessage open={open} onClose={handleClose} severity={severity} msg={msg} />
                </Box>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30
                    }}
                >
                    <Paper sx={{ width: 400, height: 'auto' }} elevation={6}>
                        <Grid container padding={3} spacing={3}>
                            <Grid xs={12}>
                                <Typography sx={{ marginLeft: 3, marginTop: 1 }} variant="h6" component="h2">
                                    <strong style={{ color: '#673ab7' }}>Rate this product</strong>
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: 3,
                                        marginTop: 1
                                    }}
                                >
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={0.5}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
                                </Box>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography sx={{ color: '#673ab7' }} variant="h6" component="h2">
                                    Review this product
                                </Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Review"
                                    multiline
                                    rows={4}
                                    fullWidth={true}
                                    inputProps={{ maxLength: 128 }}
                                    onChange={(e) => handleItemReview(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                            onClick={() => handleSubmit()}
                                        >
                                            Submit
                                        </Button>
                                    </AnimateButton>
                                </Box>
                                {/* <Button sx={{ marginTop: 5 }} fullWidth variant="contained" onClick={() => handleSubmit()}>
                                    Submit
                                </Button> */}
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </MainCard>
        </>
    );
};
export default RatingsReviewa;
