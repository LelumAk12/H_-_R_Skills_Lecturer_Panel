import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import '../styles/LoginPage.css';
export function LoginPage() {
  const navigate = useNavigate();
  const { resetUser } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset to default initial user data when logging in normally
    try {
      resetUser();
    } catch (e) {
      console.warn('resetUser not available', e);
    }
    navigate('/lecturer/profile');
  };
  return <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <img src="/Login-Logo.png" alt="H & R Skills Logo" className="login-logo" />
        </div>

        <div className="login-right">
          <form onSubmit={handleLogin} className="login-form">
            <div className="login-form-group">
              <label className="login-label">Email or Username</label>
              <input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="login-input" />
            </div>

            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div className="login-password-wrapper">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="login-input" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="login-password-toggle">
                  {showPassword ? <EyeOffIcon className="login-icon" /> : <EyeIcon className="login-icon" />}
                </button>
              </div>
            </div>

            <div className="login-forgot">
              <a href="#forgot">Forgot Password</a>
            </div>

            <button type="submit" className="login-button">
              Log In
            </button>

            <p className="login-signup">
              Don't have an account? <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>;
}