import { useState, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
        color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
    }
}));

interface Props {
    // value: string;
    // setValue: (value: string) => void;
    popupState: any;
    onChange: any;
}

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ popupState, onChange }: Props) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
            onChange={onChange}
            placeholder="Search items"
            startAdornment={
                <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <HeaderAvatarStyle variant="rounded">
                        <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                    </HeaderAvatarStyle>
                    <Box sx={{ ml: 2 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
                                color: theme.palette.orange.dark,
                                '&:hover': {
                                    background: theme.palette.orange.dark,
                                    color: theme.palette.orange.light
                                }
                            }}
                            {...bindToggle(popupState)}
                        >
                            <IconX stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </Box>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [tempValue, setTempValue] = useState('');
    const [getSearchData, setSearchData] = useState('');
    const [getList, setList] = useState([]);
    const [getTempList, setTempList] = useState([]);

    // ================== LISTED ITEMS ==================//

    useEffect(() => {
        dispatch({ type: 'LISTED_ITEMS' });
    }, []);

    const all_Listed_Items = useSelector((state: any) => state?.ListedItemsReducer?.listedItems?.data);
    console.log('all_Listed_Items search', all_Listed_Items);
    useEffect(() => {
        if (all_Listed_Items === undefined) {
            return;
        } else {
            console.log('all_Listed_Items useEffect search', all_Listed_Items);
            let newRow = all_Listed_Items.map((values: any, index: any) => ({ ...values, id: index + 1 }));

            setValue(newRow);
            setList(newRow);
            setTempList(newRow);
            dispatch({ type: 'SEARCHED_LISTED_ITEMS', payload: newRow });
        }
    }, [all_Listed_Items]);

    // =================================================//

    const handleSearch = async (event: any) => {
        event.preventDefault();
        let searchInput = event.target.value;
        console.log('searchInput>>>>>>>>>>>>>>>>>>>>>', searchInput);
        var tempArr: any = [];
        getTempList.map((item: any) => {
            const lData = item.name.toLowerCase();
            console.log('xyz items', item);

            if (lData.includes(searchInput.toLowerCase())) {
                tempArr.push(item);
            }
        });
        console.log({ tempArr });
        setList(tempArr);
        dispatch({ type: 'SEARCHED_LISTED_ITEMS', payload: tempArr });
    };

    // =================================================//

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box sx={{ ml: 2 }}>
                                <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                                    <IconSearch stroke={1.5} size="1.2rem" />
                                </HeaderAvatarStyle>
                            </Box>
                            <PopperStyle {...bindPopper(popupState)} transition>
                                {({ TransitionProps }) => (
                                    <>
                                        <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                            <Card
                                                sx={{
                                                    background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : '#fff',
                                                    [theme.breakpoints.down('sm')]: {
                                                        border: 0,
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                            >
                                                <Box sx={{ p: 2 }}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item xs>
                                                            <MobileSearch
                                                                onChange={handleSearch}
                                                                popupState={popupState}
                                                                // value={''}
                                                                // setValue={function (value: string): void {
                                                                //     throw new Error('Function not implemented.');
                                                                // }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Card>
                                        </Transitions>
                                    </>
                                )}
                            </PopperStyle>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <OutlineInputStyle
                    id="input-search-header"
                    // value={value}
                    onChange={handleSearch}
                    // onChange={(event) => setSearchData(event.target.value)}
                    placeholder="Search Items"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <HeaderAvatarStyle variant="rounded">
                                <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                            </HeaderAvatarStyle>
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>
        </>
    );
};

export default SearchSection;
