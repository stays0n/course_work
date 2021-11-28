import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../api';
import { validator } from './../../../utils/validator';

import BackButton from '../../common/backButton';
import TextField from './../../common/form/textField';
import SelectField from './../../common/form/selectField';
import RadioField from './../../common/form/radioField';
import MultiSelectField from './../../common/form/multiSelectField';

const UserEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState({
        name: '',
        email: '',
        profession: '',
        sex: '',
        qualities: [],
    });
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState({});

    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const qualy in qualities) {
                if (elem.value === qualities[qualy]._id) {
                    qualitiesArray.push(qualities[qualy]);
                }
            }
        }
        return qualitiesArray;
    };

    const getDefaultQualitiesForMultiSelect = () => {
        const { qualities } = user;
        if (qualities.length === 0) return qualities;

        return qualities.map((qualy) => ({
            value: qualy._id,
            label: qualy.name,
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, ...data }) =>
            setUser((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id,
            })),
        );
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        return () => {};
    }, []);

    useEffect(() => {
        if (user._id) setIsLoading(false);
    }, [user]);

    const handleChange = (target) => {
        setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;
    useEffect(() => {
        validate();
    }, [user]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения',
            },
            isCapitalSymbol: {
                message: 'Имя должно содержать хотя бы одну заглавную букву',
            },
        },
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения',
            },
            isEmail: {
                message: 'Почта указана неверно',
            },
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию',
            },
        },
    };

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const { profession, qualities } = user;

        const newData = {
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities),
        };

        api.users
            .update(userId, newData)
            .then((data) => history.push('/users/' + data._id));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div>
                    <BackButton />
                </div>
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {
                        // eslint-disable-next-line multiline-ternary
                        !isLoading && Object.keys(professions).length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    name="profession"
                                    options={professions}
                                    onChange={handleChange}
                                    value={user.profession}
                                    defaultOption="Выбрать..."
                                    error={errors.profession}
                                />
                                <RadioField
                                    label="Выберите ваш пол"
                                    name="sex"
                                    value={user.sex}
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
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={getDefaultQualitiesForMultiSelect()}
                                />
                                <button
                                    className="btn btn-primary w-100 mx-auto"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Submit
                                </button>
                            </form>
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
