import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useInput } from '../utils/InputHook';
import { callAPI } from '../utils/CallAPI';

const Login = () => {
  const {value:username, bind:bindUsername, reset:resetUsername} = useInput('');
  const {value:password, bind:bindPassword, reset:resetPassword} = useInput('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg();
    setIsLoading(true);
    const requestURL = 'https://ago3.uniag.ch/rest/session/';
    const requestMethod = 'POST';
    const requestBody = JSON.stringify({
      username: username,
      passwd: password,
      timeout: 2592000
    });
    const result = await callAPI({url: requestURL, method: requestMethod, body: requestBody});
    if (result.ok) {
      Object.keys(result.response).forEach((key) => {
        sessionStorage.setItem(key, result.response[key]);
      });
      setIsLoading(false);
      setLoggedIn(result.ok);
    }
    else {
      result.response.error ? setErrorMsg(`Error - ${result.response.error}`) : setErrorMsg(`Error - ${result.response}`);
      setIsLoading(false);
    }
  }

  const formLoginReset = () => {
    resetUsername();
    resetPassword();
    setErrorMsg();
  }

  if (loggedIn !== false) {
    console.log(loggedIn)
    return <Redirect to={{pathname: '/home', state: {user: loggedIn}}} />
  }
  else {
    return (
      <div className='container'>
        <div className='border p-4 my-5 mx-auto text-dark'>
          <form onSubmit={formLoginSubmit} onReset={formLoginReset}>
            <div className='form-group'>
              <label htmlFor='loginUsername'>User name</label>
              <input id='loginUsername' type='text' className='form-control' placeholder='User name' {...bindUsername} required autoComplete='username' />
            </div>
            <div className='form-group'>
              <label htmlFor='loginPassword'>Password</label>
              <input id='loginPassword' type='password' className='form-control' placeholder='Password' {...bindPassword} required autoComplete='current-password' />
            </div>
            {isLoading && <div className='loading'></div>}
            {errorMsg && errorMsg.length &&
            <div className='form-group'>
              <div className='bg-danger text-white p-3'>{errorMsg}</div>
            </div>}
            <div className='form-group'>
              <button type='submit' className='btn btn-primary'>Log in</button>
              <button type='reset' className='btn btn-secondary ml-2'>Reset</button>
            </div>
            {/* <div className='mb-2'>No account yet? <Link className='text-primary' to='/Register'>Register</Link></div>
            <div><Link className='text-primary' to='/ForgotPassword'>Forgot password?</Link></div> */}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;