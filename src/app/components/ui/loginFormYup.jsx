import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false,
    });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required('Пароль обязателен для заполнения')
            .matches(
                /(?=.*[A-ZА-ЯЁ])/,
                'Пароль должен содержать хотя бы одну заглавную букву',
            )
            .matches(
                /(?=.*[0-9])/,
                'Пароль должен содержать хотя бы одну цифру',
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                'Пароль должен содержать один из специальных символов !@#$%^&*',
            )
            .matches(
                /(?=.{8,})/,
                'Пароль должен состоять минимум из 8 символов',
            ),
        email: yup
            .string()
            .required('Электронная почта обязательна для заполнения')
            .email('Email введён некорректно'),
    });

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={'Электронная почта'}
                name={'email'}
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label={'Пароль'}
                type={'password'}
                name={'password'}
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
