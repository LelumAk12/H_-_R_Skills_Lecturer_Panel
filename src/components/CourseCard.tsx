import React, { useState } from 'react';
import { FlaskConicalIcon, PencilIcon, TrashIcon } from 'lucide-react';
import '../styles/CourseCard.css';
interface CourseCardProps {
  courseId: string;
  courseName: string;
  courseType: string;
  courseCategory: string;
  courseDescription: string;
  onEdit: (id: string, data: {
    name: string;
    category: string;
    description: string;
  }) => void;
  onDelete: (id: string) => void;
}
export function CourseCard({
  courseId,
  courseName,
  courseType,
  courseCategory,
  courseDescription,
  onEdit,
  onDelete
}: CourseCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    category: courseCategory,
    name: courseName,
    description: courseDescription
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSave = () => {
    onEdit(courseId, formData);
    setIsEditing(false);
  };
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      onDelete(courseId);
    }
  };
  return <div className="course-card-wrapper">
      <div className="course-card">
        <div className="course-card-content">
          <div className="course-card-icon">
            <FlaskConicalIcon className="course-icon" />
          </div>
          <div className="course-card-info">
            <h3 className="course-name">{courseName}</h3>
            <p className="course-type">{courseType}</p>
          </div>
        </div>
        <div className="course-card-actions">
          <button onClick={() => setIsEditing(!isEditing)} className="course-action-btn edit">
            <PencilIcon className="course-action-icon" />
          </button>
          <button onClick={handleDelete} className="course-action-btn delete">
            <TrashIcon className="course-action-icon" />
          </button>
        </div>
      </div>

      {isEditing && <div className="course-edit-form">
          <div className="course-edit-form-row">
            <div className="course-edit-form-group">
              <label className="course-edit-label">Course Category</label>
              <input type="text" name="category" placeholder="Enter category" value={formData.category} onChange={handleChange} className="course-edit-input" />
            </div>

            <div className="course-edit-form-group">
              <label className="course-edit-label">Course Name</label>
              <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className="course-edit-input" />
            </div>
          </div>

          <div className="course-edit-form-group">
            <label className="course-edit-label">Course Description</label>
            <textarea name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} className="course-edit-textarea" rows={4} />
          </div>

          <div className="course-edit-actions">
            <button onClick={handleSave} className="course-save-btn">
              Save Changes
            </button>
          </div>
        </div>}
    </div>;
}