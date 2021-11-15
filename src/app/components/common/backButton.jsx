import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  return (
    <button className='btn btn-primary' type='button' onClick={() => history.goBack()}>
      <i className='bi bi-caret-left'></i>&nbsp;Назад
    </button>
  );
};

export default BackButton;
