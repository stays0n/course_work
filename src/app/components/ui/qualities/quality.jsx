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
    qualitie: PropTypes.object.isRequired,
};

export default Qualitie;
