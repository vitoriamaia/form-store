import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./app/components/Footer";
import { Header } from "./app/components/Header";
import RouteConfig from "./app/routes";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        {/* Conteúdo principal cresce e empurra o footer para o final */}
        <main className="flex-grow">
          <RouteConfig />
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
