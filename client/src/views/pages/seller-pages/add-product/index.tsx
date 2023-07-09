import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudIcon from '@mui/icons-material/Cloud';
import { DropzoneDialog } from 'react-mui-dropzone';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './addProduct.css';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

export interface ILogin {}
export interface Iselector {
    authReducer: any;
}

const AddProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const res_user = localStorage.getItem('loginRes') || '{}';

    const user_id: any = JSON.parse(res_user).user[0]._id;

    const loginRes = useSelector((state: any) => state?.authReducer?.login);
    const [itemDetails, setItemDetails] = React.useState('');
    const [productPrice, setProductPrice] = React.useState('');

    const [ItemType, setItemType] = React.useState('');

    const [from_date, setFromDate] = React.useState('');
    const [to_date, setToDate] = React.useState('');
    const [getDiscription, setDiscription] = React.useState('');
    const [itemPicture, setItemPicture] = React.useState({
        preview: '',
        url: ''
    });
    const [open, setOpen] = React.useState(false);
    const [getFiles, setFiles] = React.useState([]);
    const [itemReview, setItemReview] = React.useState<string>('');

    let txt = 'Add Product Picture';
    const handleSelectChange = (event: SelectChangeEvent) => {
        setItemType(event.target.value);
    };

    const isEmptyObject: any = (selector: any) => {
        return JSON.stringify(selector) === '{}';
    };
    let handleSubmit = async () => {
        let form = new FormData();

        getFiles.map((item, index) => {
            return form.append('img_url', item);
        });
        // form.append("img_url", itemPicture.preview);
        form.append('name', itemDetails);
        form.append('price', productPrice);
        form.append('seller_id', user_id);
        form.append('type', ItemType);
        form.append('from_date', from_date);
        form.append('to_date', to_date);
        form.append('discription', getDiscription);
        fetch(`http://localhost:8001/api/upload-products`, {
            method: 'POST',
            body: form
        }).then(() => {
            alert('Item submitted successfully');
        });
    };

    const handleItemPicture = (e: any) => {
        setItemPicture({
            preview: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        });
    };
    console.log('itemPic', itemPicture);
    const handleSave = (files: any) => {
        console.log('Files:', files);
        setFiles(files);
        setOpen(false);
    };

    return (
        <>
            <MainCard title="Create Product Page">
                <Box
                    sx={{
                        display: 'flex',
                        alignItem: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: '420px',
                            height: 'auto',
                            borderRadius: '16px'
                        }
                    }}
                >
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 20 }}>
                                <div
                                    style={{
                                        color: '#673ab7',
                                        fontWeight: matchDownSM ? 500 : 900,
                                        fontSize: matchDownSM ? '20px' : '34px'
                                    }}
                                >
                                    Add Product
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TextField
                                    sx={{ m: 1, width: matchDownSM ? '40ch' : '45ch' }}
                                    className="text_field"
                                    id="outlined-basic"
                                    label="Product Details"
                                    variant="outlined"
                                    onChange={(e) => setItemDetails(e.target.value)}
                                />
                            </Grid>
                            {/* ==========||add price ||============ */}

                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TextField
                                    sx={{ m: 1, width: matchDownSM ? '40ch' : '45ch' }}
                                    className="text_field"
                                    id="outlined-basic"
                                    label="Product Price"
                                    variant="outlined"
                                    type="number"
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </Grid>
                            {/*=====================================*/}
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FormControl sx={{ m: 1, minWidth: matchDownSM ? 315 : 355 }} size="small">
                                    <InputLabel id="demo-select-small">Product Type</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={ItemType}
                                        label="Product Type"
                                        autoWidth={true}
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Hand Made'}>Hand Made</MenuItem>
                                        <MenuItem value={'Machine Made'}>Machine Made</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ marginTop: 10 }}>
                                    <div className="date">From Date</div>
                                    <TextField
                                        sx={{ m: 1, width: matchDownSM ? '40ch' : '45ch' }}
                                        className="text_field"
                                        id="outlined-basic"
                                        // label='From'
                                        variant="outlined"
                                        onChange={(e) => setFromDate(e.target.value)}
                                        type="date"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ marginTop: 20 }}>
                                    <div className="date">To Date</div>
                                    <TextField
                                        sx={{ m: 1, width: matchDownSM ? '40ch' : '45ch' }}
                                        className="text_field"
                                        id="outlined-basic"
                                        // label='To'
                                        variant="outlined"
                                        onChange={(e) => setToDate(e.target.value)}
                                        type="date"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div>
                                    {/* <div></div> */}
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<CloudUploadIcon />}
                                        onClick={() => setOpen(true)}
                                    >
                                        {txt.toLowerCase()}
                                    </Button> */}
                                    <Box sx={{ mt: 2 }}>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                // disabled={isSubmitting}
                                                startIcon={<CloudUploadIcon />}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => setOpen(true)}
                                            >
                                                {txt.toLowerCase()}
                                            </Button>
                                        </AnimateButton>
                                    </Box>

                                    <DropzoneDialog
                                        acceptedFiles={['image/*']}
                                        cancelButtonText={'cancel'}
                                        submitButtonText={'submit'}
                                        maxFileSize={5000000}
                                        filesLimit={6}
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        onSave={handleSave}
                                        showPreviews={true}
                                        showFileNamesInPreview={true}
                                    />
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{ marginTop: 1 }}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <TextField
                                    id="outlined-multiline-static"
                                    label="describe your product..."
                                    multiline
                                    rows={4}
                                    onChange={(event) => setDiscription(event.target.value)}
                                    // sx={{ marginTop: 2 }}
                                    value={getDiscription}
                                    sx={{ minWidth: matchDownSM ? 320 : 375 }}
                                />
                            </Grid>
                            <Grid
                                className="btm-middle"
                                item
                                xs={12}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {/* <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    size="large"
                                    fullWidth={true}
                                    sx={{ width: 375 }}
                                    // startIcon={<CloudIcon/>}
                                    startIcon={<CloudIcon />}
                                >
                                    <span style={{ color: '#006142', fontWeight: 600 }}>Submit</span>
                                </Button> */}
                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            // disabled={isSubmitting}
                                            startIcon={<CloudIcon />}
                                            // {matchDownSM?fullWidth===true:false}
                                            sx={{ width: matchDownSM ? 320 : 380 }}
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </MainCard>
        </>
    );
};
export default AddProducts;
