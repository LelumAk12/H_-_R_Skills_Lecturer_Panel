import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { QualificationTable } from '../components/QualificationTable';
import { useApp } from '../context/AppContext';
import '../styles/ProfilePage.css';
export function ProfilePage() {
  const {
    user,
    updateUser,
    addQualification,
    updateQualification,
    deleteQualification
  } = useApp();
  const [profileImage, setProfileImage] = useState(user.image);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    contact: user.contact,
    university: user.university,
    primaryCourse: user.primaryCourse
  });
  const [editingQualIndex, setEditingQualIndex] = useState<number | null>(null);
  const [qualificationForm, setQualificationForm] = useState({
    degree: '',
    institution: '',
    year: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const showToast = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveProfile = () => {
    updateUser({
      ...profileData,
      image: profileImage
    });
    showToast('Profile updated successfully!');
  };
  const handleEditQualification = (index: number) => {
    const qual = user.qualifications[index];
    setQualificationForm(qual);
    setEditingQualIndex(index);
  };
  const handleDeleteQualification = (index: number) => {
    if (window.confirm('Are you sure you want to delete this qualification?')) {
      deleteQualification(index);
      showToast('Qualification deleted successfully!');
    }
  };
  const handleSaveQualification = () => {
    if (!qualificationForm.degree || !qualificationForm.institution || !qualificationForm.year) {
      alert('Please fill in all qualification fields');
      return;
    }
    if (editingQualIndex !== null) {
      updateQualification(editingQualIndex, qualificationForm);
      showToast('Qualification updated successfully!');
    } else {
      addQualification(qualificationForm);
      showToast('Qualification added successfully!');
    }
    setQualificationForm({
      degree: '',
      institution: '',
      year: ''
    });
    setEditingQualIndex(null);
  };
  const handleCancelEdit = () => {
    setEditingQualIndex(null);
    setQualificationForm({
      degree: '',
      institution: '',
      year: ''
    });
  };
  return <div className="profile-page">
      {showSuccess && <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-icon">✓</span>
            <span className="toast-message">{successMessage}</span>
          </div>
        </div>}

      <Sidebar userName={user.name} userEmail={user.email} userImage="/Profile.jpg" />

      <div className="profile-main">
        <Header />

        <div className="profile-content">
          <div className="profile-header">
            <div>
              <h1 className="profile-title">My Profile</h1>
              <p className="profile-subtitle">
                Manage your personal and payment information.
              </p>
            </div>
          </div>

          <div className="profile-section">
            <h2 className="profile-section-title">Personal Information</h2>
            <div className="profile-info-grid">
              <div className="profile-photo-section">
                <img src={profileImage} alt="Profile" className="profile-photo" />
                <div className="profile-photo-actions">
                  <label className="profile-photo-btn secondary">
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{
                    display: 'none'
                  }} />
                  </label>
                </div>
              </div>

              <div className="profile-form">
                <div className="profile-form-group">
                  <label className="profile-label">Name</label>
                  <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} className="profile-input" placeholder="Enter your name" />
                </div>

                <div className="profile-form-group">
                  <label className="profile-label">Email</label>
                  <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} className="profile-input" placeholder="Enter your email" />
                </div>

                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label className="profile-label">Address</label>
                    <input type="text" name="address" value={profileData.address} onChange={handleProfileChange} className="profile-input" placeholder="Enter your address" />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-label">Contact No</label>
                    <input type="text" name="contact" value={profileData.contact} onChange={handleProfileChange} className="profile-input" placeholder="Enter your contact number" />
                  </div>
                </div>

                <div className="profile-form-row">
                  <div className="profile-form-group">
                    <label className="profile-label">University</label>
                    <input type="text" name="university" value={profileData.university} onChange={handleProfileChange} className="profile-input" placeholder="Enter your university" />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-label">Primary Course</label>
                    <input type="text" name="primaryCourse" value={profileData.primaryCourse} onChange={handleProfileChange} className="profile-input" placeholder="Enter your primary course" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <div className="qualifications-header">
              <h2 className="profile-section-title">Qualifications</h2>
            </div>

            {user.qualifications.length > 0 && <QualificationTable qualifications={user.qualifications} onEdit={handleEditQualification} onDelete={handleDeleteQualification} />}

            <div className="qualification-form">
              <h3 className="qualification-form-title">
                {editingQualIndex !== null ? 'Edit Qualification' : 'Add New Qualification'}
              </h3>
              <div className="qualification-form-grid">
                <div className="qualification-form-group">
                  <label className="qualification-label">Degree</label>
                  <input type="text" placeholder="e.g., BSc in Computer Science" value={qualificationForm.degree} onChange={e => setQualificationForm({
                  ...qualificationForm,
                  degree: e.target.value
                })} className="qualification-input" />
                </div>
                <div className="qualification-form-group">
                  <label className="qualification-label">Institution</label>
                  <input type="text" placeholder="e.g., University of Colombo" value={qualificationForm.institution} onChange={e => setQualificationForm({
                  ...qualificationForm,
                  institution: e.target.value
                })} className="qualification-input" />
                </div>
                <div className="qualification-form-group">
                  <label className="qualification-label">Year</label>
                  <input type="text" placeholder="e.g., 2020" value={qualificationForm.year} onChange={e => setQualificationForm({
                  ...qualificationForm,
                  year: e.target.value
                })} className="qualification-input" />
                </div>
              </div>
              <div className="qualification-form-actions">
                {editingQualIndex !== null && <button onClick={handleCancelEdit} className="qualification-btn cancel">
                    Cancel
                  </button>}
                <button onClick={handleSaveQualification} className="qualification-btn save">
                  {editingQualIndex !== null ? 'Update' : 'Add'} Qualification
                </button>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button onClick={handleSaveProfile} className="profile-save-btn">
              Save All Changes
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>;
}