import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validator } from '../../utils/validator';

import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';

import { useDispatch, useSelector } from 'react-redux';
import { signIn, getAuthError } from '../../store/users';

const LoginForm = () => {
    const history = useHistory();
    const loginError = useSelector(getAuthError());
    /**
     * при добавлении нового инпут,
     * нужно только добавить поле-состояние в объект состояния
     * handleChange останется одним для всех
     */
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false,
    });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        /**
         * название поля, а внутри требование (внутри которого сообщение,
         * которое необходимо вернуть, если требование не выполнено)
         */
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения',
            },
            isEmail: { message: 'Email введён некорректно' },
        },
        password: {
            isRequired: { message: 'Пароль обязателен для заполнения' },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву',
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одну цифру',
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8,
            },
        },
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/';

        dispatch(signIn({ payload: data, redirect }));
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
            {loginError && <p className="text-danger">{loginError}</p>}
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
