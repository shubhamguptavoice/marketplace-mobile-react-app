import React, { useState } from 'react';
import {
    Button,
    Grid,
    AppBar,
    Box,
    Toolbar,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import './roles.css';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Roles: React.FC<{}> = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* ======================================================= */}

            {/* <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: '#673ab7' }}>
                    <Toolbar variant="dense">
                        <MenuItem onClick={handleClickOpen}>
                            <span style={{ color: '#fff', fontWeight: 600 }}> Sign Up</span>
                        </MenuItem>
                    </Toolbar>
                </AppBar>
            </Box> */}

            {/* ================================================================ */}

            <div>
                {/* <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    fullScreen={true}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description"> */}
                <div style={{ marginTop: matchDownSM ? '70%' : '18%' }}>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12} lg={2}></Grid> */}
                        <Grid item xs={12} lg={6} style={{ textAlign: 'center' }}>
                            <Link
                                to="/register/1"
                                style={{
                                    color: '#673ab7',
                                    // marginRight: "100px",
                                    fontSize: '36px'
                                }}
                            >
                                Signup as Seller
                            </Link>
                        </Grid>
                        {/* <Grid item xs={12} lg={2}></Grid> */}
                        <Grid item xs={12} lg={6} style={{ textAlign: 'center', marginTop: matchDownSM ? '15%' : 0 }}>
                            <Link to="/register/0" style={{ color: '#673ab7', fontSize: '36px' }}>
                                Signup as Buyer
                            </Link>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </div>
                {/* </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            <span style={{ color: '#000', fontWeight: 600 }}>Close</span>
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </div>
        </>
    );
};
export default Roles;
