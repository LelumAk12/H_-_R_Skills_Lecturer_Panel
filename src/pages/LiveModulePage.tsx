import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import '../styles/LiveModulePage.css';
export function LiveModulePage() {
  const navigate = useNavigate();
  const {
    user
  } = useApp();
  const [formData, setFormData] = useState({
    moduleName: '',
    moduleType: '',
    date: '',
    time: '',
    description: '',
    link: '',
    payment: ''
  });
  const [errors, setErrors] = useState({
    moduleName: '',
    moduleType: '',
    date: '',
    time: '',
    description: '',
    link: '',
    payment: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  // Try to open the native picker (calendar/clock) when available
  const openNativePicker = (e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget as HTMLInputElement;
    const anyInput = input as any;
    if (typeof anyInput.showPicker === 'function') {
      try {
        anyInput.showPicker();
      } catch (err) {
        // ignore if showPicker fails
      }
    }
  };
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Allow digits and at most one decimal point, limit to 2 decimals
    value = value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1]) {
      parts[1] = parts[1].slice(0, 2);
      value = parts[0] + '.' + parts[1];
    }
    setFormData({
      ...formData,
      payment: value
    });
    if (errors.payment) {
      setErrors({
        ...errors,
        payment: ''
      });
    }
  };
  const validateForm = () => {
    const newErrors = {
      moduleName: '',
      moduleType: '',
      date: '',
      time: '',
      description: '',
      link: '',
      payment: ''
    };
    let isValid = true;
    if (!formData.moduleName.trim()) {
      newErrors.moduleName = 'Module name is required';
      isValid = false;
    }
    if (!formData.moduleType.trim()) {
      newErrors.moduleType = 'Module type is required';
      isValid = false;
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    if (!formData.link.trim()) {
      newErrors.link = 'Meeting link is required';
      isValid = false;
    } else if (!formData.link.startsWith('http')) {
      newErrors.link = 'Please enter a valid URL';
      isValid = false;
    }
    if (!formData.payment.trim()) {
      newErrors.payment = 'Payment amount is required';
      isValid = false;
    } else if (isNaN(Number(formData.payment)) || Number(formData.payment) < 0) {
      newErrors.payment = 'Please enter a valid amount';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    // Here you would typically save the live module data
    console.log('Live module scheduled:', formData);
    toast.success('Live session scheduled successfully!');
    // Reset form
    setFormData({
      moduleName: '',
      moduleType: '',
      date: '',
      time: '',
      description: '',
      link: '',
      payment: ''
    });
  };
  return <div className="live-module-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />
      <div className="live-module-main">
        <Header />
        <div className="live-module-content">
          <div className="live-module-header">
            <h1 className="live-module-title">Create New Live Module</h1>
            <p className="live-module-subtitle">
              Fill in the details below to schedule a new live session for your
              students.
            </p>
          </div>
          <div className="live-module-section">
            <form onSubmit={handleSchedule} className="live-module-form">
              <div className="live-module-form-group">
                <label className="live-module-label">
                  Module Name <span className="required">*</span>
                </label>
                <input type="text" name="moduleName" placeholder="Enter your Module Name" value={formData.moduleName} onChange={handleChange} className={`live-module-input ${errors.moduleName ? 'error' : ''}`} />
                {errors.moduleName && <span className="error-message">{errors.moduleName}</span>}
              </div>
              <div className="live-module-form-row">
                <div className="live-module-form-group">
                  <label className="live-module-label">
                    Module Type <span className="required">*</span>
                  </label>
                  <input type="text" name="moduleType" placeholder="Enter your Module type" value={formData.moduleType} onChange={handleChange} className={`live-module-input ${errors.moduleType ? 'error' : ''}`} />
                  {errors.moduleType && <span className="error-message">{errors.moduleType}</span>}
                </div>
                <div className="live-module-form-group">
                  <label className="live-module-label">
                    Date <span className="required">*</span>
                  </label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} onFocus={openNativePicker} onClick={openNativePicker} className={`live-module-input ${errors.date ? 'error' : ''}`} />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>
              </div>
              <div className="live-module-form-group">
                <label className="live-module-label">
                  Time <span className="required">*</span>
                </label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} onFocus={openNativePicker} onClick={openNativePicker} className={`live-module-input ${errors.time ? 'error' : ''}`} />
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
              <div className="live-module-form-group">
                <label className="live-module-label">
                  Description <span className="required">*</span>
                </label>
                <textarea name="description" placeholder="Enter Description..." value={formData.description} onChange={handleChange} className={`live-module-textarea ${errors.description ? 'error' : ''}`} rows={5} />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>
              <div className="live-module-form-row">
                <div className="live-module-form-group">
                  <label className="live-module-label">
                    Meeting Link <span className="required">*</span>
                  </label>
                  <input type="text" name="link" placeholder="https://zoom.us/j/123456789" value={formData.link} onChange={handleChange} className={`live-module-input ${errors.link ? 'error' : ''}`} />
                  {errors.link && <span className="error-message">{errors.link}</span>}
                </div>
                <div className="live-module-form-group">
                  <label className="live-module-label">
                    Payment (LKR) <span className="required">*</span>
                  </label>
                  <input type="text" inputMode="numeric" name="payment" placeholder="Enter amount" value={formData.payment} onChange={handlePaymentChange} className={`live-module-input ${errors.payment ? 'error' : ''}`} />
                  {errors.payment && <span className="error-message">{errors.payment}</span>}
                </div>
              </div>
              <div className="live-module-actions">
                <button type="button" onClick={() => navigate('/lecturer/courses')} className="live-module-btn cancel">
                  Cancel
                </button>
                <button type="submit" className="live-module-btn schedule">
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>;
}