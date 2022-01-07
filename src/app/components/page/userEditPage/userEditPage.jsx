import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validator } from './../../../utils/validator';

import BackButton from '../../common/backButton';
import TextField from './../../common/form/textField';
import SelectField from './../../common/form/selectField';
import RadioField from './../../common/form/radioField';
import MultiSelectField from './../../common/form/multiSelectField';
import { useProfession } from '../../../hooks/useProfession';
import { useQualities } from '../../../hooks/useQualities';
import { useAuth } from '../../../hooks/useAuth';

const UserEditPage = () => {
    const history = useHistory();

    const [loaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading) setIsLoaded(true);
    });

    const { currentUser, updateUser } = useAuth();
    const {
        professions,
        isLoading: professionsLoading,
    } = useProfession();
    const {
        qualities,
        isLoading: qualitiesLoading,
        getQualities,
    } = useQualities();

    const transformData = (data) => {
        return data.map((item) => ({
            label: item.name,
            value: item._id,
        }));
    };

    const defaultQualitiesForMultiSelect = (userQualitiesIds) => {
        if (!qualitiesLoading) {
            const quals = getQualities(userQualitiesIds);
            const transformedQuals = transformData(quals);
            return transformedQuals;
        }
        return [];
    };

    const [data, setData] = useState({
        name: currentUser.name || '',
        email: currentUser.email || '',
        sex: currentUser.sex || '',
        profession: currentUser.profession || '',
        qualities: defaultQualitiesForMultiSelect(currentUser.qualities),
    });

    useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            qualities: defaultQualitiesForMultiSelect(currentUser.qualities),
        }));
    }, [qualitiesLoading]);

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

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
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const { qualities } = data;

        const qualIds = qualities.map((qual) => qual.value);

        const newData = {
            ...currentUser,
            ...data,
            qualities: qualIds,
        };

        updateUser(newData);

        history.push('/users/' + currentUser._id);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div>
                    <BackButton />
                </div>
                {loaded ? (
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <SelectField
                                label="Выбери свою профессию"
                                name="profession"
                                options={transformData(professions)}
                                onChange={handleChange}
                                value={data.profession}
                                defaultOption="Выбрать..."
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
                                options={transformData(qualities)}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                            />

                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                disabled={!isValid}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                ) : (
                    'Loading'
                )}
            </div>
        </div>
    );
};

export default UserEditPage;
