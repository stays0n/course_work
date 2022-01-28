import React, { useState, useEffect } from 'react';
import { validator } from './../../../utils/validator';

import BackButton from '../../common/backButton';
import TextField from './../../common/form/textField';
import SelectField from './../../common/form/selectField';
import RadioField from './../../common/form/radioField';
import MultiSelectField from './../../common/form/multiSelectField';

import { useSelector, useDispatch } from 'react-redux';
import {
    getQualities,
    getQualitiesLoadingStatus,
} from '../../../store/qualities';
import {
    getProfessions,
    getProfessionsLoadingStatus,
} from '../../../store/professions';
import { getCurrentUserData, updateUserData } from '../../../store/users';

const UserEditPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    const transformData = (data) => {
        return data.map((obj) => ({ label: obj.name, value: obj._id }));
    };
    const professionsList = transformData(professions);
    const qualitiesList = transformData(qualities);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const userData = {
            ...data,
            qualities: data.qualities.map((q) => q.value),
        };
        const redirect = '/users/' + currentUser._id;

        dispatch(updateUserData({ payload: userData, redirect }));
    };

    const getQualitiesListByIds = (qualitiesIds) => {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return transformData(qualitiesArray);
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: getQualitiesListByIds(currentUser.qualities),
            });
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

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

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div>
                    <BackButton />
                </div>
                {!isLoading ? (
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
                                options={professionsList}
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
                                options={qualitiesList}
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
