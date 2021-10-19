import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import api from '../../api';

import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
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
    qualities: [],
    licence: false,
  });
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState([]);
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

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
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: { message: 'Email введён некорректно' },
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' },
      isCapitalSymbol: { message: 'Пароль должен содержать хотя бы одну заглавную букву' },
      isContainDigit: { message: 'Пароль должен содержать хотя бы одну цифру' },
      min: { message: 'Пароль должен состоять минимум из 8 символов', value: 8 },
    },
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' },
    },
    licence: {
      isRequired: {
        message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
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
      <SelectField
        label='Выберите вашу профессию'
        name='profession'
        defaultOption='Choose...'
        options={professions}
        value={data.profession}
        onChange={handleChange}
        error={errors.profession}
      />
      <RadioField
        label='Выберите ваш пол'
        name='sex'
        value={data.sex}
        onChange={handleChange}
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
        ]}
      />
      <MultiSelectField
        label='Выберите ваши качества'
        name='qualities'
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
      />
      <CheckBoxField
        name='licence'
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}>
        Подтвердить <a href='#'>лицензионное соглашение</a>
      </CheckBoxField>
      <button className='btn btn-primary w-100 mx-auto' type='submit' disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
