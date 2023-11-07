import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <div>
      <form action="/login" method="post" className={styles.form}>
        <div className={styles.formContainer}>
          <h1>Login</h1>
          <p>Please enter your email and password.</p>
          <hr />
          <label htmlFor="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" value={email} onChange={handleEmailChange} required className={styles.inputText} />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={handlePasswordChange} required className={styles.inputPassword} />

          <label htmlFor="isAdmin"><b>Logged in as an admin?</b></label>
          <input type="checkbox" id="isAdmin" name="isAdmin" checked={isAdmin} onChange={handleAdminChange} />

          <hr />
          <button type="submit" className={styles.submitButton}>Login</button>
          <p>Not yet have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
