import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header'; // Capitalized to match file name (header.jsx -> Header.jsx)
import Home from './components/Home';
import Admin from './pages/Admin';
import Client from './pages/Client';
import Login from './pages/Login';
import Report from './pages/Report';
import './styles/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/client" element={<Client />} />
            {/* Add a fallback route for undefined paths */}
            <Route path="*" element={<div className="text-center p-6"><h2>404 - Page Not Found</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;