import React from "react";
import { Link } from "react-router-dom";
export const Header: React.FC = () => {
    return (
      <header style={{ textAlign: "center", padding: "20px", background: "#f1f1f1" }}>
        <nav>
          <Link to="/">Home</Link> | <Link to="/Register">Register</Link>
        </nav>
      </header>
    );
  }