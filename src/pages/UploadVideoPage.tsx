import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { UploadIcon, VideoIcon } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/UploadVideoPage.css';
export function UploadVideoPage() {
  const navigate = useNavigate();
  const {
    user
  } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null as File | null
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        videoFile: file
      });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.videoFile) {
      toast.error('Please select a video file');
      return;
    }
    toast.success('Video uploaded successfully!');
    navigate('/lecturer/courses');
  };
  return <div className="upload-video-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />
      <div className="upload-video-main">
        <Header />
        <div className="upload-video-content">
          <h1 className="upload-video-title">Upload Course Video</h1>
          <div className="upload-video-section">
            <form onSubmit={handleSubmit} className="upload-video-form">
              <div className="upload-video-form-group">
                <label className="upload-video-label">Video Title</label>
                <input type="text" name="title" placeholder="Enter video title" value={formData.title} onChange={handleChange} className="upload-video-input" required />
              </div>
              <div className="upload-video-form-group">
                <label className="upload-video-label">Description</label>
                <textarea name="description" placeholder="Enter video description" value={formData.description} onChange={handleChange} className="upload-video-textarea" rows={5} required />
              </div>
              <div className="upload-video-form-group">
                <label className="upload-video-label">Video File</label>
                <div className="upload-video-dropzone">
                  <input type="file" accept="video/*" onChange={handleFileChange} className="upload-video-file-input" id="video-upload" />
                  <label htmlFor="video-upload" className="upload-video-dropzone-label">
                    {formData.videoFile ? <>
                        <VideoIcon className="upload-video-icon" />
                        <span>{formData.videoFile.name}</span>
                      </> : <>
                        <UploadIcon className="upload-video-icon" />
                        <span>Click to upload or drag and drop</span>
                        <span className="upload-video-hint">
                          MP4, MOV, AVI (max 500MB)
                        </span>
                      </>}
                  </label>
                </div>
              </div>
              <div className="upload-video-actions">
                <button type="button" onClick={() => navigate('/lecturer/courses')} className="upload-video-btn cancel">
                  Cancel
                </button>
                <button type="submit" className="upload-video-btn upload">
                  Upload Video
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>;
}