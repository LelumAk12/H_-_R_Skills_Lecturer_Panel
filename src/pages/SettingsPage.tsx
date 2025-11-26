import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'sonner';
import '../styles/SettingsPage.css';
export function SettingsPage() {
  const { user } = useApp();
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  const validatePasswordForm = () => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    let isValid = true;
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      isValid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleChangePassword = () => {
    if (!validatePasswordForm()) {
      toast.error('Please check the password fields');
      return;
    }
    // Here you would typically call an API to change the password
    toast.success('Password changed successfully!');
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  return <div className="settings-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />
      <div className="settings-main">
        <Header />
        <div className="settings-content">
          <div className="settings-header">
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">
              Manage your account and preferences
            </p>
          </div>
          <div className="settings-section">
            <h2 className="settings-section-title">Account Information</h2>
            <div className="settings-form">
              <div className="settings-form-row">
                <div className="settings-form-group">
                  <label className="settings-label">Current Password <span className="required">*</span></label>
                  <input type="password" name="currentPassword" placeholder="Enter Current Password" value={formData.currentPassword} onChange={handleChange} className={`settings-input ${errors.currentPassword ? 'error' : ''}`} />
                  {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                </div>
                <div className="settings-form-group">
                  <label className="settings-label">New Password <span className="required">*</span></label>
                  <input type="password" name="newPassword" placeholder="Enter New password" value={formData.newPassword} onChange={handleChange} className={`settings-input ${errors.newPassword ? 'error' : ''}`} />
                  {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>
              </div>
              <div className="settings-form-group">
                <label className="settings-label">
                  Confirm New Password <span className="required">*</span>
                </label>
                <input type="password" name="confirmPassword" placeholder="Confirm New password" value={formData.confirmPassword} onChange={handleChange} className={`settings-input ${errors.confirmPassword ? 'error' : ''}`} />
                {errors.confirmPassword && <span className="error-message">
                    {errors.confirmPassword}
                  </span>}
              </div>
              <div className="settings-password-action">
                <button onClick={handleChangePassword} className="settings-change-password-btn">
                  Change password
                </button>
              </div>
            </div>
          </div>
          <div className="settings-section">
            <h2 className="settings-section-title">Appearance</h2>
            <div className="settings-form">
              <div className="settings-form-group settings-theme">
                <label className="settings-label">Theme</label>
                <div className="settings-select-wrapper">
                  <select className="settings-select" value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                  <span className="settings-select-icon">▾</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>;
}