import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppProvider } from './context/AppContext';
import { ScrollToTop } from './components/ScrollToTop';

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
      <Routes>
        <Route path="/" element={<Navigate to="/lecturer/login" replace />} />

        {/* Lecturer Routes */}
        <Route path="/lecturer/login" element={<AppProvider>
              <LecturerLoginPage />
            </AppProvider>} />
        <Route path="/lecturer/profile" element={<AppProvider>
              <ProfilePage />
            </AppProvider>} />
        <Route path="/lecturer/courses" element={<AppProvider>
              <MyCoursesPage />
            </AppProvider>} />
        <Route path="/lecturer/add-course" element={<AppProvider>
              <AddNewCoursePage />
            </AppProvider>} />
        <Route path="/lecturer/create-course" element={<AppProvider>
              <CreateNewCoursePage />
            </AppProvider>} />
        <Route path="/lecturer/upload-video" element={<AppProvider>
              <UploadVideoPage />
            </AppProvider>} />
        <Route path="/lecturer/create-quiz" element={<AppProvider>
              <CreateQuizPage />
            </AppProvider>} />
        <Route path="/lecturer/live-module" element={<AppProvider>
              <LiveModulePage />
            </AppProvider>} />
        <Route path="/lecturer/payment" element={<AppProvider>
              <PaymentPage />
            </AppProvider>} />
        <Route path="/lecturer/notification" element={<AppProvider>
              <NotificationPage />
            </AppProvider>} />
        <Route path="/lecturer/settings" element={<AppProvider>
              <SettingsPage />
            </AppProvider>} />
      </Routes>
    </BrowserRouter>
  );
}