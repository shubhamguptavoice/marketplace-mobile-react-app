import React from 'react';
import { Stack, Snackbar, LinearProgress } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export interface Iprop {
    open: boolean;
    onClose: any;
    severity: any;
    msg: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BannerMessage = (props: Iprop) => {
    const { open, onClose, severity, msg } = props;

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 300);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={5000} onClose={onClose}>
                <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                    <LinearProgress
                        variant="determinate"
                        color="inherit"
                        sx={{ color: 'rgb(165, 212, 72)', background: '#fff' }}
                        value={progress}
                    />
                </Alert>
            </Snackbar>
        </Stack>
    );
};
export default BannerMessage;
