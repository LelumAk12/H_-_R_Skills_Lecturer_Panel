import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import '../styles/RegisterPage.css';

export function RegisterPage() {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [role, setRole] = useState<'student' | 'lecture'>('lecture');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // Phone number input handler with validation
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Allow only digits, +, and hyphens
    value = value.replace(/[^0-9+\-]/g, '');
    
    // Apply length constraints
    if (value.startsWith('+94')) {
      // +94 format: max 12 digits (including +94)
      if (value.length > 12) {
        value = value.slice(0, 12);
      }
    } else if (value.startsWith('0')) {
      // 0 format: max 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    } else if (value === '+') {
      // Allow + to be typed
      value = value;
    } else if (value && value !== '0' && !value.startsWith('+')) {
      // If doesn't start with 0 or +94, just allow up to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }
    
    setContact(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<string, string>> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (contact) {
      if (contact.startsWith('+94') && contact.length !== 12) {
        newErrors.contact = 'Phone number with +94 must be exactly 12 digits';
      } else if (contact.startsWith('0') && contact.length !== 10) {
        newErrors.contact = 'Phone number starting with 0 must be exactly 10 digits';
      } else if (!contact.startsWith('+94') && !contact.startsWith('0')) {
        newErrors.contact = 'Phone number must start with 0 or +94';
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // For now simply navigate to login (or profile) — backend not implemented here
      try {
        // Update global user in context so the whole site reflects the new user
        updateUser({
          name: fullName,
          email,
          contact,
          primaryCourse: subject,
          image: '/Profile.jpg',
          address: '',
          university: ''
        });
        toast.success('Account created successfully');
      } catch (e) {
        // if context not ready, still navigate
        console.warn('updateUser failed', e);
      }

      // Navigate to profile view where user state is used across the app
      navigate('/lecturer/profile');
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-left">
          <img src="/Login-Logo.png" alt="H & R Skills Logo" className="register-logo" />
        </div>

        <div className="register-right">
          <form onSubmit={handleSubmit} className="register-form">
            <h1 className="register-title">Create Your Account</h1>

            <div className="register-role-toggle">
              <button type="button" className={`role-btn ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>Student</button>
              <button type="button" className={`role-btn ${role === 'lecture' ? 'active' : ''}`} onClick={() => setRole('lecture')}>Lecture</button>
            </div>

            <div className="register-field">
              <label>Full Name</label>
              <input className={errors.fullName ? 'input-error' : ''} value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" />
              {errors.fullName && <div className="field-error">{errors.fullName}</div>}
            </div>

            <div className="register-field">
              <label>Email</label>
              <input className={errors.email ? 'input-error' : ''} value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="register-field">
              <label>Subject</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Information Technology" />
            </div>

            <div className="register-field">
              <label>Contact Number</label>
              <input className={errors.contact ? 'input-error' : ''} value={contact} onChange={handleContactChange} placeholder="Enter your contact number" />
              {errors.contact && <div className="field-error">{errors.contact}</div>}
            </div>

            <div className="register-field">
              <label>Password</label>
              <div className="password-wrapper">
                <input className={errors.password ? 'input-error' : ''} type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter a strong password" />
                <button type="button" className="pwd-toggle" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
              </div>
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>

            <div className="register-field">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input className={errors.confirmPassword ? 'input-error' : ''} type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
                <button type="button" className="pwd-toggle" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
              </div>
              {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="register-submit">Create Account</button>

            <p className="register-login">Already Have an account? <a href="/lecturer/login" onClick={(e) => { e.preventDefault(); navigate('/lecturer/login'); }}>Log In</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
