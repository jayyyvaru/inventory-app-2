import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      
      {/* ✅ Desktop Sidebar */}
      <div
        className="d-none d-md-block"
        style={{
          minWidth: "220px",
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid #dee2e6",
        }}
      >
        <Sidebar />
      </div>

      {/* ✅ Mobile Sidebar (Drawer) */}
      {showSidebar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "220px",
            height: "100%",
            backgroundColor: "#fff",
            zIndex: 1050,
            boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
          }}
        >
          <Sidebar />
        </div>
      )}

      {/* ✅ Overlay (click to close) */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1040,
          }}
        />
      )}

      {/* ✅ Main Area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ height: "100vh", overflow: "hidden" }}>
        
        {/* Navbar */}
        <div className="d-flex align-items-center px-3 border-bottom">
          
          {/* 🔥 Mobile Hamburger */}
          <button
            className="btn btn-outline-secondary d-md-none me-2"
            onClick={() => setShowSidebar(true)}
          >
            ☰
          </button>

          <div className="flex-grow-1">
            <Navbar />
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-grow-1 overflow-auto container mt-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;