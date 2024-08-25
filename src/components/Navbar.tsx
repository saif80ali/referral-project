import '../style/Navbar.scss';

export default function Navbar() {
  return (
    <nav className="navbar border-body">
      <div className="container">
        <span className="mb-0 fs-1 heading-logo-font">ReferMe</span>
        <div className="d-flex gap-2" role="search">
          <button type="button" className="btn btn-outline-dark border-0">Sign in</button>
          <button type="button" className="btn btn-success">Sign up</button>
        </div>
      </div>
    </nav>
  );
}
