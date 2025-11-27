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
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
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

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    const value = forgotEmail.trim();
    if (!value) {
      setForgotError('Email is required');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(value)) {
      setForgotError('Please enter a valid email address');
      return;
    }

    // Simulate sending reset link
    setForgotSuccess(`If an account exists for ${value}, a reset link has been sent.`);
    setTimeout(() => {
      setShowForgot(false);
      setForgotEmail('');
      setForgotSuccess('');
    }, 2500);
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
              <button type="button" className="forgot-link" onClick={() => { setShowForgot(true); setForgotError(''); setForgotSuccess(''); setForgotEmail(''); }}>Forgot Password</button>
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
      {showForgot && <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="forgot-modal">
          <button className="forgot-close" onClick={() => setShowForgot(false)} aria-label="Close">×</button>
          <h3 className="login-title" style={{fontSize: '20px', marginBottom: 8}}>Forgot Password</h3>
          <p style={{marginTop: 0, marginBottom: 16, color: 'var(--text-secondary)'}}>Enter your email and we'll send a password reset link.</p>
          <form onSubmit={handleForgotSubmit} className="forgot-form">
            <div className="login-form-group">
              <label className="login-label">Email</label>
              <input type="email" placeholder="your@example.com" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} className="login-input" />
              {forgotError && <p className="forgot-error">{forgotError}</p>}
              {forgotSuccess && <p className="forgot-success">{forgotSuccess}</p>}
            </div>
            <div className="forgot-actions">
              <button type="button" className="login-button forgot-cancel" onClick={() => setShowForgot(false)}>Cancel</button>
              <button type="submit" className="login-button">Send Link</button>
            </div>
          </form>
        </div>
      </div>}
    </div>;
}