// Layout.jsx
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './components/Home'; // Keeps your navbar styling intact

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Navigation Bar stays fixed at the top */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" style={{ textDecoration: 'none', color: 'white' }}>
            <span className="logo-icon">🌿</span> Raji's Nourish Hub
          </Link>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>About Me</Link>
            <Link to="/book" className="nav-cta" onClick={() => setIsMenuOpen(false)}>Book a Session</Link>
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* The child routes (Home, About, etc.) render right here */}
      <main className="main-content" style={{ marginTop: '80px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
