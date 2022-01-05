import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextAreaField from '../../common/form/textAreaField';
import { validator } from '../../../utils/validator';

const CommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({ content: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: 'Сообщение не может быть пустым',
            },
        },
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData({ content: '' });
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <h2>New comment</h2>
                <TextAreaField
                    value={data.content || ''}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                    rows="3"
                />
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                        Опубликовать
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
};

CommentForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default CommentForm;
