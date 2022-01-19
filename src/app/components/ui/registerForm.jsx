import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import { useHistory } from 'react-router-dom';

import SelectField from './../common/form/selectField';
import RadioField from './../common/form/radioField';
import MultiSelectField from './../common/form/multiSelectField';
import CheckBoxField from './../common/form/checkBoxField';
import { useProfession } from './../../hooks/useProfession';
import { useAuth } from './../../hooks/useAuth';

import { useSelector } from 'react-redux';
import { getQualities } from '../../store/qualities';

const RegisterForm = () => {
    const history = useHistory();
    /**
     * при добавлении нового инпут,
     * нужно только добавить поле-состояние в объект состояния
     * handleChange останется одним для всех
     */
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        name: '',
        qualities: [],
        licence: false,
    });
    const { signUp } = useAuth();
    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
    }));
    const { professions } = useProfession();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id,
    }));

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
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения',
            },
            min: {
                message: 'Имя должно состоять минимум из 2 символов',
                value: 2,
            },
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
        profession: {
            isRequired: { message: 'Обязательно выберите вашу профессию' },
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value),
        };

        try {
            await signUp(newData);
            history.push('/');
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выберите вашу профессию"
                name="profession"
                defaultOption="Choose..."
                options={professionsList}
                value={data.profession}
                onChange={handleChange}
                error={errors.profession}
            />
            <RadioField
                label="Выберите ваш пол"
                name="sex"
                value={data.sex}
                onChange={handleChange}
                options={[
                    { name: 'Male', value: 'male' },
                    { name: 'Female', value: 'female' },
                    { name: 'Other', value: 'other' },
                ]}
            />
            <MultiSelectField
                label="Выберите ваши качества"
                name="qualities"
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
            />
            <CheckBoxField
                name="licence"
                value={data.licence}
                onChange={handleChange}
                error={errors.licence}
            >
                Подтвердить <a href="#">лицензионное соглашение</a>
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

export default RegisterForm;
