import { useState, useEffect } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from './page.module.css';
import authServices from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";

export default function Auth() {
    const [formType, setFormType] = useState('login');
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const { login, signup, authLoading } = authServices();

    const navigate = useNavigate();
    const authData = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        if (authData) {
            navigate('/profile');
        }
    }, [authData, navigate]);  

    const handleChangeFormType = () => {
        setFormData({});
        setErrorMessage(''); 
        setFormType(formType === 'login' ? 'signup' : 'login');
    };

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        setErrorMessage('');  

        switch (formType) {
            case 'login':
                login(formData);
                break;
            case 'signup':
                if (formData.password !== formData.confirmPassword) {
                    setErrorMessage('Passwords do not match');
                    return;
                }
                signup(formData);
                break;
        }
    };

    if (authLoading) {
        return <CircularProgress />;
    }

    return (
        <div className={styles.authPageContainer}>
            {formType === 'login' && (
                <>
                    <h1>Login</h1>
                    <button onClick={handleChangeFormType}>Don't you have an account? Click here</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField
                            required
                            label="Email"
                            type="email"
                            name="email"
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Password"
                            type="password"
                            name="password"
                            onChange={handleFormDataChange}
                        />
                        <button type="submit" variant="contained">Login<LuLogIn/></button>
                    </form>
                </>
            )}

            {formType === 'signup' && (
                <>
                    <h1>Signup</h1>
                    <button onClick={handleChangeFormType}>Already have an account? Click here</button>
                    <form onSubmit={handleSubmitForm}>
                        <TextField
                            required
                            label="Fullname"
                            type="text"
                            name="fullname"
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Email"
                            type="email"
                            name="email"
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Password"
                            type="password"
                            name="password"
                            onChange={handleFormDataChange}
                        />
                        <TextField
                            required
                            label="Confirm password"
                            type="password"
                            name="confirmPassword"
                            onChange={handleFormDataChange}
                        />
                        <button type="submit" variant="contained">Signup<LuLogIn/></button>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </>
            )}
        </div>
    );
}
