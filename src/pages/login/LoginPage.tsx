import { useState } from 'react';
import axios from 'axios';
import './loginpage.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://gp-ooo8.onrender.com/users/login', {
        email: email,
        password: password
      });
      const { token } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      window.location.href = '/courses';
      
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-login">
        <h2>Login</h2>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">Login</button>
        <a href="/register">Don't have an account?</a>
      </form>
    </div>
  );
};

export default LoginPage;
