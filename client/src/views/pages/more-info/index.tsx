import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './MoreInfo.css';

export interface IMoreInfo {}

const MoreInfo: React.FC<IMoreInfo> = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    var [email, setEmail] = React.useState('');
    var [id, setId] = React.useState('');
    var [dob, setDob] = React.useState('');
    var [phonno, setPhonno] = React.useState('');
    let items = { id, phonno, dob, email };

    React.useEffect(() => {
        setId(params.id!);
    }, []);

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };
    const [value, setValue] = React.useState(dayjs('2022-08-18T21:11:54'));

    const handleDateChange = (newValue: any) => {
        // setValue(newValue);
        setDob(newValue);
    };
    let handleSubmit = async (e: any) => {
        e.preventDefault();

        let res = await fetch(`http://localhost:8001/api/google/extrainfocheck/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(items)
        });
        let resJson = await res.json();

        if (res.status === 200) {
            alert('User created successfully');
            navigate('/buy-products');
        } else {
            alert('Some error occured');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 400,
                    height: 'auto',
                    borderRadius: '16px'
                }
            }}
        >
            <Paper elevation={0}>
                <div className="heading">Give more info to register</div>

                <div className="subHead">Email Address</div>
                <TextField
                    sx={{ m: 1, width: '45ch' }}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text_field"
                    id="outlined-basic"
                    variant="outlined"
                />
                <div style={{ marginTop: 10 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="DOB"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleDateChange}
                            // onChange={(e) => setDob(e.target.value)}
                            renderInput={(params) => <TextField {...params} />}
                            className="date_picker"
                        />
                    </LocalizationProvider>
                </div>
                <div className="subHead">Contact No.</div>
                <TextField
                    sx={{ m: 1, width: '45ch' }}
                    onChange={(e) => setPhonno(e.target.value)}
                    className="text_field"
                    id="outlined-basic"
                    variant="outlined"
                />
                {/* <div className='subHead'>Password</div>
        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
         
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
           </InputAdornment>
            }
           
          />
        </FormControl>  */}
                <Button variant="contained" size="large" fullWidth={true} onClick={handleSubmit}>
                    <span style={{ color: '#006142', fontWeight: 600 }}>Log in</span>
                </Button>
            </Paper>
        </Box>
    );
};

export default MoreInfo;
