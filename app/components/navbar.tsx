"use client";
import React, { useState } from 'react';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '64px'
        }}>
          {/* Logo 
          <div>
            <a href="/" style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1a1a1a',
              textDecoration: 'none'
            }}>
              Logo
            </a>
          </div> */}

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap:'30px'
          }}>
            <a href="/" style={{
              color: '#4a5568',
              textDecoration: 'none'
            }}>Home</a>
            <a href="/stores" style={{
              color: '#4a5568',
              textDecoration: 'none'
            }}>Stores</a>
            <a href="/bulletins" style={{
              color: '#4a5568',
              textDecoration: 'none'
            }}>Bulletins</a>
                <a href="/prices" style={{
              color: '#4a5568',
              textDecoration: 'none'
            }}>prices</a>
                <a href="/currencies" style={{
              color: '#4a5568',
              textDecoration: 'none'
            }}>currencies</a>
            <a href="/offers" style={{
              color: '#4a5568',
              textDecoration: 'none'
            }}>Offers</a>
            
          </div>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;