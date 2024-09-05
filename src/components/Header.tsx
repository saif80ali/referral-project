import "../style/navbar.scss";
import { toggleLoginModal, setUserLoggedIn } from "../store/features/loginState";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect } from "react";


export default function Header() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token?.length) {
      dispatch(setUserLoggedIn(true));
    } else {
      dispatch(setUserLoggedIn(false));
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserLoggedIn(false));
  }

  function logoutButton(){
    return (<button
      type="button"
      className="btn btn-outline-dark border-0 fw-bold"
      onClick={handleLogout}>
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
        <NavLink to={"/"} className="mb-0 fs-1 heading-logo-font nav-link">ReferMe</NavLink>
        <ul className="navbar-nav">
          <li className="nav-item "><NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active':''}`}>Dashboard</NavLink></li>
        </ul>
        <div className="d-flex gap-2" role="search">
          {NavButton}
        </div>
      </div>
    </nav>
  );
}
