// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery, Grid, Stack } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

// project imports
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import LocalizationSection from './LocalizationSection';
import MegaMenuSection from './MegaMenuSection';
import NotificationSection from './NotificationSection';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';

// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();
    // mobile view routing & mobile view Searchbar
    return (
        <>
            {/* <Grid container spacing={2}> */}
            {/* logo & toggler button */}
            {/* <Grid item xs={12} md={12}> */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                {
                    // (layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd))

                    matchDownMd ? (
                        <></>
                    ) : (
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                overflow: 'hidden',
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                                }
                            }}
                            onClick={() => dispatch(openDrawer(!drawerOpen))}
                            color="inherit"
                        >
                            <IconMenu2 stroke={1.5} size="20px" />
                        </Avatar>
                    )
                }
            </Box>
            {/* </Grid> */}
            {/* header search */}
            {/* <Grid item md={12}> */}
            <SearchSection />
            {/* </Grid> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* mega-menu */}
            {/* <Grid item md={12}> */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <MegaMenuSection />
            </Box>
            {/* </Grid> */}
            {/* live customization & localization */}
            {/* <Grid item md={12}> */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box>
            {/* </Grid> */}
            {/* notification & profile */}
            {/* <Grid item md={12}> */}
            <NotificationSection />
            {/* </Grid> */}
            {/* <Grid item md={12}> */}
            <ProfileSection />
            {/* </Grid> */}

            {/* mobile header */}
            {/* <Grid item md={12}> */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
            {/* </Grid> */}
            {/* {matchDownMd && (
                    <Grid item md={12}>
                        <Stack direction="row" spacing={2}>
                            <Avatar onClick={() => navigate('/listed-products')} sx={{ bgcolor: deepPurple[500], color: '#fff' }}>
                                List
                            </Avatar>
                            <Avatar onClick={() => navigate('/add-products')} sx={{ bgcolor: deepPurple[500], color: '#fff' }}>
                                Add
                            </Avatar>
                            <Avatar onClick={() => navigate('/buy-products')} sx={{ bgcolor: deepPurple[500], color: '#fff' }}>
                                Buy
                            </Avatar>
                        </Stack>
                    </Grid>
                )} */}
            {/* </Grid> */}
        </>
    );
};

export default Header;
