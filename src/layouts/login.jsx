import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RegisterForm from './../components/ui/registerForm';
import LoginForm from './../components/ui/loginForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');

  const toggleFormType = () => {
    setFormType((prevState) => (prevState === 'register' ? 'login' : 'register'));
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {
            // eslint-disable-next-line multiline-ternary
            formType === 'register' ? (
              <React.Fragment>
                <h3 className='mb-4'>Register</h3>
                <RegisterForm />
                <p>
                  Already have account?
                  <a role='button' className='btn mt-2' onClick={toggleFormType}>
                    Sign in
                  </a>
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h3 className='mb-4'>Login</h3>
                <LoginForm />
                <p>
                  Dont have account?
                  <a role='button' className='btn mt-2' onClick={toggleFormType}>
                    Sign up
                  </a>
                </p>
              </React.Fragment>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
