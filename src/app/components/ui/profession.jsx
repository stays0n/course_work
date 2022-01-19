import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import {
    getProfessionById,
    getProfessionsLoadingStatus,
} from '../../store/professions';

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    if (isLoading) return 'Profession Loading...';

    const profession = useSelector(getProfessionById(id));

    return <p>{profession.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Profession;
