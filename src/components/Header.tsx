import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, BellIcon, UserIcon, XIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../styles/Header.css';
export function Header() {
  const navigate = useNavigate();
  const {
    searchCourses,
    unreadCount
  } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchCourses(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };
  const handleSearchResultClick = (courseId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    // Navigate to the specific course details page using the courseId
    navigate(`/lecturer/courses/${courseId}`);
  };
  return <header className="header">
      <div className="header-logo" onClick={() => navigate('/lecturer/profile')}>
        <img src="/Logo.png" alt="H & R Skills" className="header-logo-image" />
      </div>

      <nav className="header-nav">
        <button onClick={() => navigate('/lecturer/profile')} className="header-nav-link">
          Home
        </button>
        <button onClick={() => navigate('/lecturer/courses')} className="header-nav-link">
          My Courses
        </button>
        <button onClick={() => navigate('/lecturer/live-module')} className="header-nav-link live">
          • Live
        </button>
      </nav>

      <div className="header-actions">
        {isSearchOpen && <div className="header-search-wrapper">
            <input type="text" placeholder="Search courses..." value={searchQuery} onChange={e => handleSearch(e.target.value)} className="header-search-input" autoFocus />
            {searchResults.length > 0 && <div className="header-search-results">
                {searchResults.map(course => <div key={course.id} onClick={() => handleSearchResultClick(course.id)} className="header-search-result-item">
                    <div className="header-search-result-name">
                      {course.name}
                    </div>
                    <div className="header-search-result-type">
                      {course.type}
                    </div>
                  </div>)}
              </div>}
            <button onClick={() => setIsSearchOpen(false)} className="header-search-close">
              <XIcon className="header-icon" />
            </button>
          </div>}

        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="header-icon-btn">
          <SearchIcon className="header-icon" />
        </button>

        <button onClick={() => navigate('/lecturer/notification')} className="header-icon-btn notification">
          <BellIcon className="header-icon" />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>

        <button onClick={() => navigate('/lecturer/profile')} className="header-icon-btn">
          <UserIcon className="header-icon" />
        </button>
      </div>
    </header>;
}