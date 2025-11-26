import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import '../styles/AddNewCoursePage.css';
export function AddNewCoursePage() {
  const navigate = useNavigate();
  const {
    user,
    addCourse
  } = useApp();
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    type: '',
    description: '',
    price: ''
  });
  const [errors, setErrors] = useState({
    category: '',
    name: '',
    type: '',
    description: '',
    price: ''
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
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Price input handler: allow only digits and optional decimal (max 2 decimals)
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // remove any characters except digits and dot
    value = value.replace(/[^0-9.]/g, '');
    // avoid multiple dots
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    // limit decimals to 2
    if (parts[1]) parts[1] = parts[1].slice(0, 2);
    value = parts[1] ? parts[0] + '.' + parts[1] : parts[0];
    setFormData({ ...formData, price: value });
    if (errors.price) setErrors({ ...errors, price: '' });
  };
  const validateForm = () => {
    const newErrors = {
      category: '',
      name: '',
      type: '',
      description: '',
      price: ''
    };
    let isValid = true;
    if (!formData.category.trim()) {
      newErrors.category = 'Course category is required';
      isValid = false;
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
      isValid = false;
    }
    if (!formData.type.trim()) {
      newErrors.type = 'Course type is required';
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required';
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
      isValid = false;
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    // Save course to context
    addCourse({
      name: formData.name,
      type: formData.type,
      category: formData.category,
      description: formData.description,
      price: formData.price
    });
    toast.success('Course created successfully!');
    navigate('/lecturer/courses');
  };
  return <div className="add-course-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />
      <div className="add-course-main">
        <Header />
        <div className="add-course-content">
          <h1 className="add-course-title">Add New Course</h1>
          <div className="add-course-section">
            <h2 className="add-course-section-title">Course Details</h2>
            <form onSubmit={handleNext} className="add-course-form">
              <div className="add-course-form-row">
                <div className="add-course-form-group">
                  <label className="add-course-label">
                    Course Category <span className="required">*</span>
                  </label>
                  <input type="text" name="category" placeholder="Enter category" value={formData.category} onChange={handleChange} className={`add-course-input ${errors.category ? 'error' : ''}`} />
                  {errors.category && <span className="error-message">{errors.category}</span>}
                </div>
                <div className="add-course-form-group">
                  <label className="add-course-label">
                    Course Name <span className="required">*</span>
                  </label>
                  <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className={`add-course-input ${errors.name ? 'error' : ''}`} />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
              </div>
              <div className="add-course-form-group">
                <label className="add-course-label">
                  Course Type <span className="required">*</span>
                </label>
                <input type="text" name="type" placeholder="e.g. Certificate, Diploma, HND" value={formData.type} onChange={handleChange} className={`add-course-input ${errors.type ? 'error' : ''}`} />
                {errors.type && <span className="error-message">{errors.type}</span>}
              </div>
              <div className="add-course-form-group">
                <label className="add-course-label">
                  Course Description <span className="required">*</span>
                </label>
                <textarea name="description" placeholder="Enter description (minimum 20 characters)" value={formData.description} onChange={handleChange} className={`add-course-textarea ${errors.description ? 'error' : ''}`} rows={6} />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>
              <div className="add-course-form-group add-course-price">
                <label className="add-course-label">
                  Price (LKR) <span className="required">*</span>
                </label>
                <input type="text" name="price" placeholder="Enter amount" value={formData.price} onChange={handlePriceChange} inputMode="decimal" className={`add-course-input ${errors.price ? 'error' : ''}`} />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
              <div className="add-course-actions">
                <button type="button" onClick={() => navigate('/lecturer/courses')} className="add-course-btn back">
                  Back
                </button>
                <button type="submit" className="add-course-btn next">
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>;
}