import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadIcon, XIcon, FileVideoIcon } from 'lucide-react';
import { Footer } from '../components/Footer';
import '../styles/UploadVideoPage.css';
export function UploadVideoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course: '',
    videoTitle: '',
    description: '',
    duration: '00:00:00'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid video file');
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('video-file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a video file');
      return;
    }
    alert('Video uploaded successfully!');
    navigate('/lecturer/create-course');
  };
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  return <div className="upload-video-page">
      <header className="upload-video-header">
        <div className="upload-video-header-logo">
          <img src="/Logo.png" alt="H & R Skills" className="upload-video-logo" />
        </div>

        <nav className="upload-video-nav">
          <button onClick={() => navigate('/lecturer/profile')} className="upload-video-nav-link">
            Home
          </button>
          <button onClick={() => navigate('/lecturer/courses')} className="upload-video-nav-link">
            My Courses
          </button>
          <button onClick={() => navigate('/lecturer/live-module')} className="upload-video-nav-link live">
            • Live
          </button>
        </nav>

        <div className="upload-video-header-actions">
          <button className="upload-video-header-icon">🔍</button>
          <button className="upload-video-header-icon">🔔</button>
          <button className="upload-video-header-icon">👤</button>
        </div>
      </header>

      <div className="upload-video-content">
        <h1 className="upload-video-title">Upload New Video</h1>

        <div className="upload-video-section">
          <h2 className="upload-video-section-title">Course Informtaion</h2>

          <form onSubmit={handleUpload} className="upload-video-form">
            <div className="upload-video-form-row">
              <div className="upload-video-form-group">
                <label className="upload-video-label">Course</label>
                <input type="text" name="course" placeholder="Enter Course name" value={formData.course} onChange={handleChange} className="upload-video-input" />
              </div>

              <div className="upload-video-form-group">
                <label className="upload-video-label">Video Title</label>
                <input type="text" name="videoTitle" placeholder="Enter Titile" value={formData.videoTitle} onChange={handleChange} className="upload-video-input" />
              </div>
            </div>

            <div className="upload-video-form-group">
              <label className="upload-video-label">Description</label>
              <textarea name="description" placeholder="Provide a brife description of the video content" value={formData.description} onChange={handleChange} className="upload-video-textarea" rows={5} />
            </div>

            <div className="upload-video-form-group">
              <label className="upload-video-label">Video File</label>
              {!selectedFile ? <label htmlFor="video-file-input" className="upload-video-upload-box">
                  <UploadIcon className="upload-video-upload-icon" />
                  <p className="upload-video-upload-text">Click to upload</p>
                  <p className="upload-video-upload-subtext">
                    MP4, AVI, MOV (max 500MB)
                  </p>
                  <input id="video-file-input" type="file" accept="video/*" onChange={handleFileSelect} className="upload-video-file-input" />
                </label> : <div className="upload-video-file-selected">
                  <div className="upload-video-file-info">
                    <FileVideoIcon className="upload-video-file-icon" />
                    <div className="upload-video-file-details">
                      <p className="upload-video-file-name">
                        {selectedFile.name}
                      </p>
                      <p className="upload-video-file-size">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <button type="button" onClick={handleRemoveFile} className="upload-video-remove-btn">
                    <XIcon className="upload-video-remove-icon" />
                  </button>
                </div>}
            </div>

            <div className="upload-video-form-group upload-video-duration">
              <label className="upload-video-label">Duration (HH:MM:SS)</label>
              <input type="text" name="duration" placeholder="00:00:00" value={formData.duration} onChange={handleChange} className="upload-video-input" />
            </div>

            <div className="upload-video-actions">
              <button type="button" onClick={() => navigate('/lecturer/create-course')} className="upload-video-btn cancel">
                Cancel
              </button>
              <button type="submit" className="upload-video-btn upload">
                Upload Video
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>;
}