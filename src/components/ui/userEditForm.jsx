import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from './../../api';
import { validator } from './../../utils/validator';

import TextField from './../common/form/textField';
import SelectField from './../common/form/selectField';
import RadioField from './../common/form/radioField';
import MultiSelectField from './../common/form/multiSelectField';
import { useHistory } from 'react-router';

const UserEditForm = ({ state }) => {
  const history = useHistory();
  const userData = {
    name: state.name,
    email: state.email,
    profession: state.profession._id,
    sex: state.sex,
    qualities: state.qualities.map((q) => ({
      value: q._id,
      label: q.name,
    })),
  };

  const [data, setData] = useState(userData);
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

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

  const [errors, setErrors] = useState({});

  const isValid = Object.keys(errors).length === 0;

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const [activeProfessions] = Object.values(professions).filter(
      (profession) => profession._id === data.profession,
    );

    const activeQualitiesId = data.qualities.map((quality) => quality.value);
    const activeQualities = Object.values(qualities).filter((qual) =>
      activeQualitiesId.includes(qual._id),
    );

    const newData = { ...data, profession: activeProfessions, qualities: activeQualities };

    api.users.update(state._id, newData);

    history.replace('/users/' + state._id);
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Имя'
              name='name'
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label='Электронная почта'
              name='email'
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <SelectField
              label='Выбери свою профессию'
              name='profession'
              value={data.profession}
              onChange={handleChange}
              defaultOption='Выбрать...'
              options={professions}
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
            <button
              className='btn btn-primary w-100 mx-auto'
              type='submit'
              disabled={!professions && !isValid}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

UserEditForm.propTypes = {
  state: PropTypes.object,
};

export default UserEditForm;
