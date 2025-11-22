import { useNavigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
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
  const handleDelete = (id: string) => {
    deleteCourse(id);
  };
  return <div className="my-courses-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />

      <div className="my-courses-main">
        <Header />

        <div className="my-courses-content">
          <h1 className="my-courses-title">My Courses</h1>

          <div className="courses-list">
            {courses.map(course => <CourseCard key={course.id} courseId={course.id} courseName={course.name} courseType={course.type} courseCategory={course.category} courseDescription={course.description} onEdit={handleEdit} onDelete={handleDelete} />)}
          </div>

          <button onClick={() => navigate('/lecturer/add-course')} className="add-course-btn">
            <PlusIcon className="add-course-icon" />
            Add New Course
          </button>
        </div>

        <Footer />
      </div>
    </div>;
}