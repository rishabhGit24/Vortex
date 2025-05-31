import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Whistleblower</h1>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/report" className="active">Report</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;