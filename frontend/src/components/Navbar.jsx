import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ audioEnabled, toggleAudio }) {
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/education', label: 'Education' },
    { to: '/interests', label: 'Interests' },
  ];

  return (
    <nav className="navbar">
      <span className="nav-brand"></span>
      <div className="nav-links">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={pathname === l.to ? 'active' : ''}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <button className="audio-btn" onClick={toggleAudio} title="Toggle ambient music">
        {audioEnabled ? '🔊' : '🔇'}
      </button>
    </nav>
  );
}