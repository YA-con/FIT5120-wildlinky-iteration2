import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavDropdown.css';

const NavDropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = items.some(item => location.pathname.startsWith(item.to));

  return (
    <div
      className="nav-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="nav-button"
        style={{
          color: isActive ? '#f6c948' : 'white',
          fontWeight: '800'
        }}
      >
        {title} <span className="arrow">▾</span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {items.map((item) => {
            const isItemActive = location.pathname === item.to;
            return (
              <Link
                to={item.to}
                className={`dropdown-item ${isItemActive ? 'active' : ''}`}
                key={item.to}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
