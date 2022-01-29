import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';

import { useSelector, useDispatch } from 'react-redux';
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList,
} from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());

    useEffect(() => {
        dispatch(loadQualitiesList());
        return () => null;
    }, []);

    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    if (isLoading) return 'Loading...';
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
