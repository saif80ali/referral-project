import "../style/navbar.scss";
import { toggleLoginModal } from "../store/features/loginState";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
export default function Header() {
  const dispatch = useDispatch();

  function logoutButton(){
    return (<button
      type="button"
      className="btn btn-outline-dark border-0 fw-bold">
      Logout
    </button>)
  }
  
  function loginOptions() {
    return (
      <>
      <button
        type="button"
        className="btn btn-outline-dark border-0 fw-bold"
        onClick={() => {
          dispatch(toggleLoginModal());
        }}>Sign in</button>
      <button type="button" className="btn btn-success fw-bold">
        Sign up
      </button>
    </>
    )
  }
  
  const isLoggedIn = useSelector((state: RootState) => state.userLogin.userLoggedIn);
  const NavButton = isLoggedIn ? logoutButton() : loginOptions();

  return (
    <nav className="navbar border-body">
      <div className="container">
        <Link to={"/"} className="mb-0 fs-1 heading-logo-font nav-link">ReferMe</Link>
        <ul className="navbar-nav">
          <li className="nav-item "><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        </ul>
        <div className="d-flex gap-2" role="search">
          {NavButton}
        </div>
      </div>
    </nav>
  );
}
