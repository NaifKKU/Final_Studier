import { useState } from 'react';
import axios from 'axios';
import './registerpage.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://gp-ooo8.onrender.com/users/register', {
        email: email,
        password: password
      });
      const { token } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      window.location.href = '/login';
      
    } catch (error) {
      console.error('register failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="form-register">
        <h2>Register</h2>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="register-button">Register</button>
        <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
};

export default RegisterPage;
