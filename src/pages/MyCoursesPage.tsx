import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { CourseCard } from '../components/CourseCard';
import { useApp } from '../context/AppContext';
import '../styles/MyCoursesPage.css';
export function MyCoursesPage() {
  const navigate = useNavigate();
  const {
    courses,
    updateCourse,
    deleteCourse,
    user
  } = useApp();
  const handleEdit = (id: string, data: {
    name: string;
    category: string;
    description: string;
  }) => {
    updateCourse(id, data);
  };
  const [deleteCourseId, setDeleteCourseId] = React.useState<string | null>(null);
  const requestDelete = (id: string) => setDeleteCourseId(id);
  const confirmDelete = () => {
    if (!deleteCourseId) return;
    deleteCourse(deleteCourseId);
    setDeleteCourseId(null);
  };
  const cancelDelete = () => setDeleteCourseId(null);
  return <div className="my-courses-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />

      <div className="my-courses-main">
        <Header />

        <div className="my-courses-content">
          <h1 className="my-courses-title">My Courses</h1>

          <div className="courses-list">
            {courses.map(course => <CourseCard key={course.id} courseId={course.id} courseName={course.name} courseType={course.type} courseCategory={course.category} courseDescription={course.description} onEdit={handleEdit} onDelete={requestDelete} />)}
          </div>

          <button onClick={() => navigate('/lecturer/add-course')} className="add-course-btn">
            <PlusIcon className="add-course-icon" />
            Add New Course
          </button>
        </div>

        {deleteCourseId !== null && <div className="course-delete-overlay">
          <div className="course-delete-card">
            <h3 className="course-delete-title">Delete Course?</h3>
            <p className="course-delete-body">Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className="course-delete-actions">
              <button className="course-delete-btn cancel" onClick={cancelDelete}>Cancel</button>
              <button className="course-delete-btn confirm" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>}

      </div>
    </div>;
}