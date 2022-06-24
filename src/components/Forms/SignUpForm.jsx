import BaseForm from "./BaseForm";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link} from 'react-router-dom';
import Button from '@/components/UI/Button';
import {Title} from '../Typography';
import {useEffect, useState} from "react";
import {findNonSerializableValue} from "@reduxjs/toolkit";
// import './style.scss'


const UseValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'isEmail':
                    const regEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
                    regEx.test(value.toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;
                case 'isPassword':
                    const regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                    regExPassword.test(value) ? setPasswordError(false) : setPasswordError(true)
                    break;
            }
        }
    }, [value])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        passwordError
    }
}


const useInputForm = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = UseValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

const SignUpForm = ({onSubmit}) => {
    const validation = () => {
    };

    const firstName = useInputForm('', {isEmpty: true, minLength: 3, maxLength: 15})
    const lastName = useInputForm('', {isEmpty: true, minLength: 3, maxLength: 15})
    const email = useInputForm('', {isEmpty: true, minLength: 6, maxLength: 30, isEmail: true})
    const password = useInputForm('', {isEmpty: true, minLength: 8, maxLength: 12, isPassword: true})

    function checkName(name) {
        if (name.isDirty) {
            if (name.isEmpty) {
                return <div style={{color: "red"}}>Заполните поле</div>
            }

            if (name.minLengthError) {
                return <div style={{color: "red"}}>Короткое имя</div>
            }

            if (name.maxLengthError) {
                return <div style={{color: "red"}}>Длинное имя</div>
            }
        }
    }

    function checkEmail(name) {
        if (name.isDirty) {
            if (name.isEmpty) {
                return <div style={{color: "red"}}>Заполните поле</div>
            }

            if (name.minLengthError) {
                return <div style={{color: "red"}}>Короткое имя</div>
            }

            if (name.maxLengthError) {
                return <div style={{color: "red"}}>Длинное имя</div>
            }

            if (name.emailError) {
                return <div style={{color: "red"}}>Неверный Email</div>
            }
        }
    }

    function checkPassword(name) {
        if (name.isDirty) {
            if (name.isEmpty) {
                return <div style={{color: "red"}}>Заполните поле</div>
            }

            if (name.minLengthError) {
                return <div style={{color: "red"}}>Короткое имя</div>
            }

            if (name.maxLengthError) {
                return <div style={{color: "red"}}>Длинное имя</div>
            }

            if (name.passwordError) {
                return <div style={{color: "red"}}>Пароль должен состоять из: 1 - заглавной и строчной буквы, 2 -
                    одной цифры, 3 - минимум 8,  4 - содержать символы "!@#$%^&*" </div>
            }
        }
    }


    return (
        <BaseForm title="Sign Up" onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    {checkName(firstName)}
                    <TextField
                        className="form__input"
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={firstName.value}
                        onChange={e => firstName.onChange(e)}
                        onBlur={e => firstName.onBlur(e)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    {checkName(lastName)}
                    <TextField
                        className="form__input"
                        margin="normal"
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={lastName.value}
                        onChange={e => lastName.onChange(e)}
                        onBlur={e => lastName.onBlur(e)}
                    />
                </Grid>

                <Grid item xs={12}>
                    {checkEmail(email)}
                    <TextField
                        className="form__input"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={email.value}
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                    />
                </Grid>

                <Grid item xs={12}>
                    {checkPassword(password)}
                    <TextField
                        className="form__input"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={password.value}
                        onChange={e => password.onChange(e)}
                        onBlur={e => password.onBlur(e)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button className="form__button" type="submit" fullWidth>
                        Sign Up
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Link to="/sign-in" className="form__link">
                        <div>Already have an account? Sign in</div>
                    </Link>
                </Grid>
            </Grid>
        </BaseForm>
    );
};

export default SignUpForm;