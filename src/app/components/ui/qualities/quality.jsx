import React from 'react';
import PropTypes from 'prop-types';

const Qualitie = ({ qualitie: { color, name, _id } }) => {
    return (
        <span className={'badge m-1 bg-' + color} key={_id}>
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    qualitie: PropTypes.exact({
        color: PropTypes.string,
        name: PropTypes.string,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
};

export default Qualitie;
