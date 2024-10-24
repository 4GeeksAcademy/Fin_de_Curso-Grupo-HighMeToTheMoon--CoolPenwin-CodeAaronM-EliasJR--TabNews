import React, { Component } from "react";

export const Footer = () => (
	<footer 
  className="footer mt-4 py-4 text-center" // Cambié py-4 a py-2
  style={{ 
      background: 'linear-gradient(45deg, #d3d9db, #e2e6ea)', 
      color: '#333', 
      fontFamily: "'Roboto', sans-serif" 
  }}
>
  <p style={{ margin: 0, fontSize: '1rem' }}> {/* Ajusté el tamaño de fuente a 1rem */}
      Made with 🍑 by
      <a
          href="https://github.com/CoolPenwin"
          style={{
              color: '#007bff',
              textDecoration: 'none', 
              marginLeft: '5px', 
              fontWeight: 'bold', 
              transition: 'color 0.3s' 
          }}
          onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0056b3'; 
          }}
          onMouseLeave={(e) => {
              e.currentTarget.style.color = '#007bff'; 
          }}
      >
          <img
              className="logo"
              src="https://avatars.githubusercontent.com/u/171165391?v=4"
              style={{
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '50%',
                  width: '40px', // Reducido el tamaño del logo
                  marginRight: '5px', 
                  transition: 'transform 0.3s' 
              }}
              alt="logo"
              onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; 
              }}
              onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; 
              }}
          />
          CoolPenwin
      </a>
  </p>
</footer>
);