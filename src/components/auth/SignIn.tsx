import { Alert, Button, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import React from "react";
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../..//helper/Constants';
import AuthState from './AuthState';
import PaymentCards from '../../views/Purchase';

const SignInComponent = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<any | null>(null);

    const [snackbarMessage, setSnackbarMessage] = React.useState<string>("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error" | "warning" | "info">("success");
    const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);

    const onSubmit = (e: any) => {

        e.preventDefault();

        // Simple form validation
        if (!formData.email || !formData.password) {
            setError('Email and Password are required');
            return;
        }

        setIsLoading(true);

        axios.post(`http://${API_URL}/login`, formData)
            .then((res) => {
                setIsLoading(false);

                if (res.status === 200) {
                    if (signIn({
                        token: res.data.token,
                        expiresIn: 3600*48,
                        tokenType: "Bearer",
                        authState: {
                            email: res.data.email,
                            token: res.data.access_token
                        },
                        // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                        // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                    })) {
                        // Redirect to home page or wherever you see fit
                        navigate('/races');
                        setSnackbarOpen(true);
                        setSnackbarMessage(`Log in successful!`);
                        setSnackbarSeverity(`success`);

                    } else {
                        // New error handling code for unsuccessful login
                        setSnackbarOpen(true);
                        setSnackbarMessage("Log in unsuccessful!");
                        setSnackbarSeverity("error");
                    }
                }
            })
        .catch((err) => {
            setIsLoading(false);
            setError(err.message || 'An error occurred. Please try again.');
            setSnackbarOpen(true);
            setSnackbarMessage('Log in unsuccessful.');
            setSnackbarSeverity("error");
        });

    }


    return (
        <>
            <div className="mb-3">
                <div className="col">
                    <TextField
                        label="Login"
                        variant="outlined"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    Login
                </Button>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <AuthState />

                <div>
             <PaymentCards/>
        </div>

            </div>
        </>
    )
}

export default SignInComponent;
