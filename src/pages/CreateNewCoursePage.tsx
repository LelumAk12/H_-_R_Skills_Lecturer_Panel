import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { Footer } from '../components/Footer';
import '../styles/CreateNewCoursePage.css';
export function CreateNewCoursePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/lecturer/courses');
  };
  return <div className="create-course-page">
      <header className="create-course-header">
        <div className="create-course-header-logo">
          <img src="/Logo.png" alt="H & R Skills" className="create-course-logo" />
        </div>

        <nav className="create-course-nav">
          <button onClick={() => navigate('/lecturer/profile')} className="create-course-nav-link">
            Home
          </button>
          <button onClick={() => navigate('/lecturer/courses')} className="create-course-nav-link">
            My Courses
          </button>
          <button onClick={() => navigate('/lecturer/live-module')} className="create-course-nav-link live">
            • Live
          </button>
        </nav>

        <div className="create-course-header-actions">
          <button className="create-course-header-icon">🔍</button>
          <button className="create-course-header-icon">🔔</button>
          <button className="create-course-header-icon">👤</button>
        </div>
      </header>

      <div className="create-course-content">
        <h1 className="create-course-title">Create New Course</h1>

        <div className="create-course-section">
          <h2 className="create-course-section-title">Course Informtaion</h2>

          <form onSubmit={handleSave} className="create-course-form">
            <div className="create-course-form-group">
              <label className="create-course-label">Course Title</label>
              <input type="text" name="title" placeholder="Enter Titile" value={formData.title} onChange={handleChange} className="create-course-input" />
            </div>

            <div className="create-course-form-group">
              <label className="create-course-label">Course Description</label>
              <textarea name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} className="create-course-textarea" rows={5} />
            </div>

            <div className="create-course-form-group">
              <label className="create-course-label">Course Videos</label>
              <div className="create-course-upload-box">
                <button type="button" onClick={() => navigate('/lecturer/upload-video')} className="create-course-upload-btn">
                  <PlusIcon className="create-course-upload-icon" />
                  Add Video
                </button>
              </div>
            </div>

            <div className="create-course-form-group">
              <label className="create-course-label">Course Quiz</label>
              <div className="create-course-upload-box">
                <button type="button" onClick={() => navigate('/lecturer/create-quiz')} className="create-course-upload-btn">
                  <PlusIcon className="create-course-upload-icon" />
                  Add Quiz
                </button>
              </div>
            </div>

            <div className="create-course-actions">
              <button type="button" onClick={() => navigate('/lecturer/add-course')} className="create-course-btn cancel">
                Cancel
              </button>
              <button type="submit" className="create-course-btn save">
                save
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>;
}