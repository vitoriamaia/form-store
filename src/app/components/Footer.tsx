import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={{ textAlign: "center", padding: "20px",  }}>
      <p>© 2023 Your Company Name. All rights reserved.</p>
      <p>
        <a href="/privacy-policy">Privacy Policy</a> |{" "}
        <a href="/terms-of-service">Terms of Service</a>
      </p>
    </footer>
  );
}
export default Footer;