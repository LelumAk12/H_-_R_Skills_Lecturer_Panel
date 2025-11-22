import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppProvider } from './context/AppContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';

// Lecturer Routes
import { LoginPage as LecturerLoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { MyCoursesPage } from './pages/MyCoursesPage';
import { AddNewCoursePage } from './pages/AddNewCoursePage';
import { CreateNewCoursePage } from './pages/CreateNewCoursePage';
import { UploadVideoPage } from './pages/UploadVideoPage';
import { CreateQuizPage } from './pages/CreateQuizPage';
import { LiveModulePage } from './pages/LiveModulePage';
import { PaymentPage } from './pages/PaymentPage';
import { NotificationPage } from './pages/NotificationPage';
import { SettingsPage } from './pages/SettingsPage';
export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <div className="app-root">
        <AppProvider>
          <div className="app-layout">
            <Routes>
          <Route path="/" element={<Navigate to="/lecturer/login" replace />} />

          {/* Lecturer Routes */}
          <Route path="/lecturer/login" element={<LecturerLoginPage />} />
          <Route path="/lecturer/profile" element={<ProfilePage />} />
          <Route path="/lecturer/courses" element={<MyCoursesPage />} />
          <Route path="/lecturer/add-course" element={<AddNewCoursePage />} />
          <Route path="/lecturer/create-course" element={<CreateNewCoursePage />} />
          <Route path="/lecturer/upload-video" element={<UploadVideoPage />} />
          <Route path="/lecturer/create-quiz" element={<CreateQuizPage />} />
          <Route path="/lecturer/live-module" element={<LiveModulePage />} />
          <Route path="/lecturer/payment" element={<PaymentPage />} />
          <Route path="/lecturer/notification" element={<NotificationPage />} />
          <Route path="/lecturer/settings" element={<SettingsPage />} />
        </Routes>
          </div>
        </AppProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}