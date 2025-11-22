import { useNavigate } from 'react-router-dom'
import {
  FacebookIcon,
  InstagramIcon,
  MessageCircleIcon,
  YoutubeIcon,
} from 'lucide-react'
import '../styles/Footer.css'
export function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo-wrapper">
            <img src="/Footer-Logo.jpg"
              alt="H & R Skills"
              className="footer-logo" />
          </div>
          <div className="footer-social">
            <button className="footer-social-btn">
              <FacebookIcon className="footer-social-icon" />
            </button>
            <button className="footer-social-btn">
              <InstagramIcon className="footer-social-icon" />
            </button>
            <button className="footer-social-btn">
              <MessageCircleIcon className="footer-social-icon" />
            </button>
            <button className="footer-social-btn">
              <YoutubeIcon className="footer-social-icon" />
            </button>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">QUICK LINKS</h3>
          <ul className="footer-links">
            <li>
              <button onClick={() => navigate('/lecturer/profile')}>Home</button>
            </li>
            <li>
              <button onClick={() => navigate('/lecturer/courses')}>
                Courses
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/lecturer/live-module')}>
                Live
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/lecturer/payment')}>
                Payment
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/lecturer/notification')}>
                Notification
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/lecturer/settings')}>
                Settings
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">OUR CONTACTS</h3>
          <div className="footer-contact">
            <p>
              <strong>Address:</strong>
            </p>
            <p>*****************</p>
            <p>
              <strong>Phone No:</strong>
            </p>
            <p>*** *** ****</p>
            <p>
              <strong>Email:</strong>
            </p>
            <p>*****@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          2025 © All Rights Reserved | H & R Skills Pvt Ltd | Designed &
          Developed by{' '}
          <a
            href="https://everefficient.lk/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            EVER EFFICIENT Business Management (Pvt) Ltd.
          </a>
        </p>
      </div>
    </footer>
  )
}
