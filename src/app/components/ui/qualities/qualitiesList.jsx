import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';

import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualities } = useQualities();

    if (!isLoading) {
        const userQualities = getQualities(qualities);
        return (
            <React.Fragment>
                {userQualities.map((item) => (
                    <Quality key={item._id} qualitie={item} />
                ))}
            </React.Fragment>
        );
    } else {
        return 'Loading...';
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array,
};

export default QualitiesList;
