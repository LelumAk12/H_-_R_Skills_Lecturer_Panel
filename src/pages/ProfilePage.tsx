import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
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
  const [contactError, setContactError] = useState('');
  const [qualifications, setQualifications] = useState(user.qualifications || []);
  const [deleteQualIndex, setDeleteQualIndex] = useState<number | null>(null);
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
  const contactRef = useRef<HTMLInputElement | null>(null);
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // If user starts with a plus sign: treat as international input
    if (val.startsWith('+')) {
      // keep only + and digits
      val = '+' + val.slice(1).replace(/\D/g, '');

      // Enforce +94 specific rule: +94 followed by 9 digits -> total length 12
      if (val.startsWith('+94')) {
        if (val.length > 12) val = val.slice(0, 12);
        setContactError(val.length > 0 && val.length < 12 ? 'International format: +94 followed by 9 digits (total 12 chars)' : '');
      } else {
        // For other international formats, allow up to 15 chars (rough max)
        if (val.length > 15) val = val.slice(0, 15);
        setContactError('');
      }

      setProfileData({ ...profileData, contact: val });
      return;
    }

    // Non-international: keep digits only
    val = val.replace(/\D/g, '');

    // If starts with 0 enforce 10 digits total
    if (val.startsWith('0')) {
      if (val.length > 10) val = val.slice(0, 10);
      setContactError(val.length > 0 && val.length < 10 ? 'Local format: start with 0 and use 10 digits total' : '');
    } else {
      // For other local entries, cap to 10 digits
      if (val.length > 10) val = val.slice(0, 10);
      setContactError('');
    }

    setProfileData({ ...profileData, contact: val });
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
    // Validate contact: require at least 10 digits (digits only)
    const digitsOnly = String(profileData.contact || '').replace(/\D/g, '');
    if (digitsOnly.length > 0 && digitsOnly.length < 10) {
      setContactError('Contact number must contain at least 10 digits');
      // Scroll to and focus the contact input
      if (contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        contactRef.current.focus();
      }
      return;
    }

    // Clear any existing contact error
    setContactError('');

    updateUser({
      ...profileData,
      image: profileImage
    });
    showToast('Profile updated successfully!');
  };
  const handleEditQualification = (index: number) => {
    const qual = qualifications[index];
    setQualificationForm(qual);
    setEditingQualIndex(index);
  };
  const handleDeleteQualification = (index: number) => {
    // open confirmation card instead of native confirm
    setDeleteQualIndex(index);
  };

  const confirmDeleteQualification = () => {
    if (deleteQualIndex === null) return;
    deleteQualification(deleteQualIndex);
    setQualifications(prev => prev.filter((_, i) => i !== deleteQualIndex));
    setDeleteQualIndex(null);
    showToast('Qualification deleted successfully!');
  };

  const cancelDeleteQualification = () => {
    setDeleteQualIndex(null);
  };
  const handleSaveQualification = () => {
    if (!qualificationForm.degree || !qualificationForm.institution || !qualificationForm.year) {
      alert('Please fill in all qualification fields');
      return;
    }
    if (editingQualIndex !== null) {
      updateQualification(editingQualIndex, qualificationForm);
      setQualifications(prev => prev.map((q, i) => i === editingQualIndex ? qualificationForm : q));
      showToast('Qualification updated successfully!');
    } else {
      addQualification(qualificationForm);
      setQualifications(prev => [...prev, qualificationForm]);
      showToast('Qualification added successfully!');
    }
    setQualificationForm({
      degree: '',
      institution: '',
      year: ''
    });
    setEditingQualIndex(null);
  };

  // prepare year options (current year down to 1950)
  const yearOptions: string[] = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1950; y--) yearOptions.push(String(y));

  useEffect(() => {
    setQualifications(user.qualifications || []);
  }, [user.qualifications]);
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

      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />

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
                      <input ref={contactRef} type="tel" inputMode="numeric" pattern="[0-9]*" name="contact" value={profileData.contact} onChange={handleContactChange} className="profile-input" placeholder="Enter your contact number" />
                      {contactError && <div className="field-error">{contactError}</div>}
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

            {qualifications && qualifications.length > 0 && <QualificationTable qualifications={qualifications} onEdit={handleEditQualification} onDelete={handleDeleteQualification} />}

            {/* Inline Add Form: only shown when not editing an existing qualification */}
            {editingQualIndex === null && <div className="qualification-form">
              <h3 className="qualification-form-title">Add New Qualification</h3>
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
                  <select value={qualificationForm.year} onChange={e => setQualificationForm({ ...qualificationForm,
                  year: e.target.value
                })} className="qualification-input">
                    <option value="">Select year</option>
                    {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div className="qualification-form-actions">
                <button onClick={handleSaveQualification} className="qualification-btn save">Add Qualification</button>
              </div>
            </div>}

            {/* Edit Popup: modal card to edit existing qualification */}
            {editingQualIndex !== null && <div className="qual-edit-overlay">
              <div className="qual-edit-card">
                <h3 className="qualification-form-title">Edit Qualification</h3>
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
                      <select value={qualificationForm.year} onChange={e => setQualificationForm({ ...qualificationForm,
                      year: e.target.value
                    })} className="qualification-input">
                        <option value="">Select year</option>
                        {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                  </div>
                </div>
                <div className="qualification-form-actions">
                  <button onClick={handleCancelEdit} className="qualification-btn cancel">Cancel</button>
                  <button onClick={handleSaveQualification} className="qualification-btn save">Update Qualification</button>
                </div>
              </div>
            </div>}
          </div>

          <div className="profile-actions">
            <button onClick={handleSaveProfile} className="profile-save-btn">
              Save All Changes
            </button>
          </div>
          {deleteQualIndex !== null && <div className="qual-delete-overlay">
              <div className="qual-delete-card">
                <h3 className="qual-delete-title">Delete Qualification?</h3>
                <p className="qual-delete-body">Are you sure you want to delete this qualification? This action cannot be undone.</p>
                <div className="qual-delete-actions">
                  <button className="qual-delete-btn cancel" onClick={cancelDeleteQualification}>Cancel</button>
                  <button className="qual-delete-btn confirm" onClick={confirmDeleteQualification}>Delete</button>
                </div>
              </div>
            </div>}
        </div>

        
      </div>
    </div>;
}