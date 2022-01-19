import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';

import { useSelector } from 'react-redux';
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
} from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());

    if (isLoading) return 'Loading...';

    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    return (
        <React.Fragment>
            {qualitiesList.map((item) => (
                <Quality key={item._id} qualitie={item} />
            ))}
        </React.Fragment>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array,
};

export default QualitiesList;
