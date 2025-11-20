import React, { useEffect, useState, createContext, useContext } from 'react';
interface Course {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  price: string;
}
interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}
interface Qualification {
  degree: string;
  institution: string;
  year: string;
}
interface User {
  name: string;
  email: string;
  image: string;
  address: string;
  contact: string;
  university: string;
  primaryCourse: string;
  qualifications: Qualification[];
}
interface AppContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  searchCourses: (query: string) => Course[];
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  user: User;
  updateUser: (user: Partial<User>) => void;
  addQualification: (qualification: Qualification) => void;
  updateQualification: (index: number, qualification: Qualification) => void;
  deleteQualification: (index: number) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);
const initialCourses: Course[] = [{
  id: '1',
  name: 'Biomedical Science',
  type: 'Certificate',
  category: 'Science',
  description: 'Introduction to biomedical science fundamentals',
  price: '15000'
}, {
  id: '2',
  name: 'Biomedical Science',
  type: 'Diploma',
  category: 'Science',
  description: 'Advanced biomedical science diploma program',
  price: '25000'
}, {
  id: '3',
  name: 'Biomedical Science',
  type: 'Higher National Deploma',
  category: 'Science',
  description: 'Comprehensive higher national diploma in biomedical science',
  price: '35000'
}];
const initialNotifications: Notification[] = [{
  id: '1',
  title: 'New Student Enrolled',
  description: 'A student enrolled in your course Human Anatomy & Physiology.',
  timestamp: '2 hours ago',
  read: false
}, {
  id: '2',
  title: 'Payment Received',
  description: 'You received LKR 23,000 for Biomedical Instrumentation Lecture.',
  timestamp: '5 hours ago',
  read: false
}, {
  id: '3',
  title: 'Withdrawal Approved',
  description: 'Your payment withdrawal request has been approved.',
  timestamp: '1 day ago',
  read: false
}];
const initialUser: User = {
  name: 'Dr. Nadeesha Perera',
  email: 'nadeeshaperera@gmail.com',
  image: "/Profile.jpg",
  address: '392/6, Kandy Road, Colombo',
  contact: '077 456 1***',
  university: '**** University',
  primaryCourse: 'Biomedical Science',
  qualifications: [{
    degree: 'BSc in Biomedical Science',
    institution: 'University of Sri Jayewardenepura',
    year: '2018'
  }, {
    degree: 'MSc in Molecular Biology',
    institution: 'University of Colombo',
    year: '2014'
  }, {
    degree: 'PhD in Biomedical Research',
    institution: 'University of Melbourne',
    year: '2012'
  }]
};
export function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : initialUser;
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return saved as 'light' | 'dark' || 'light';
  });
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = {
      ...course,
      id: Date.now().toString()
    };
    setCourses([...courses, newCourse]);
  };
  const updateCourse = (id: string, updatedCourse: Partial<Course>) => {
    setCourses(courses.map(course => course.id === id ? {
      ...course,
      ...updatedCourse
    } : course));
  };
  const deleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };
  const searchCourses = (query: string): Course[] => {
    if (!query.trim()) return courses;
    const lowerQuery = query.toLowerCase();
    return courses.filter(course => course.name.toLowerCase().includes(lowerQuery) || course.type.toLowerCase().includes(lowerQuery) || course.category.toLowerCase().includes(lowerQuery) || course.description.toLowerCase().includes(lowerQuery));
  };
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => notif.id === id ? {
      ...notif,
      read: true
    } : notif));
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  const updateUser = (updatedUser: Partial<User>) => {
    setUser({
      ...user,
      ...updatedUser
    });
  };
  const addQualification = (qualification: Qualification) => {
    setUser({
      ...user,
      qualifications: [...user.qualifications, qualification]
    });
  };
  const updateQualification = (index: number, qualification: Qualification) => {
    const updatedQualifications = [...user.qualifications];
    updatedQualifications[index] = qualification;
    setUser({
      ...user,
      qualifications: updatedQualifications
    });
  };
  const deleteQualification = (index: number) => {
    setUser({
      ...user,
      qualifications: user.qualifications.filter((_, i) => i !== index)
    });
  };
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  return <AppContext.Provider value={{
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    searchCourses,
    notifications,
    unreadCount,
    markAsRead,
    user,
    updateUser,
    addQualification,
    updateQualification,
    deleteQualification,
    theme,
    toggleTheme
  }}>
      {children}
    </AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}