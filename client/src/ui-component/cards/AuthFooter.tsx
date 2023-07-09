// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://marketplace.com" target="_blank" underline="hover">
            marketplace.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://marketplace.com" target="_blank" underline="hover">
            &copy; All right reserved @2023
        </Typography>
    </Stack>
);

export default AuthFooter;
