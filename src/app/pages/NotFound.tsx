import React from "react";
import { Link } from "react-router-dom";
//
const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}
export default NotFound;