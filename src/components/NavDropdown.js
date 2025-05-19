import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavDropdown.css';

const NavDropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="nav-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="nav-button">
        {title} <span className="arrow">▾</span>
      </button>
      {open && (
        <div className="dropdown-menu">
          {items.map((item) => (
            <Link to={item.to} className="dropdown-item" key={item.to}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
