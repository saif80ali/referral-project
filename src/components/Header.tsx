import {
  toggleLoginModal,
  setUserLoggedIn,
} from "../store/features/loginState";
import {setToaster} from "../store/features/toasterState";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useIsUserOnline } from "../shared/useIsUserOnline";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useIsUserOnline();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token?.length) {
      dispatch(setUserLoggedIn(true));
    } else {
      dispatch(setUserLoggedIn(false));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserLoggedIn(false));
    dispatch(setToaster({type:"warning", message: "User logged out!", time: 1000}));
    navigate("/");
  };

  function logoutButton() {
    return (
      <button
        type="button"
        className="btn btn-outline-warning fw-bold"
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  }

  function redirecToSignUp() {
    navigate("/sign-up")
  }

  function loginOptions() {
    return (
      <>
        <button
          type="button"
          className="btn btn-outline-dark border-0 fw-bold"
          onClick={() => {
            dispatch(toggleLoginModal());
          }}
        >
          Sign in
        </button>
        <button onClick={redirecToSignUp} type="button" className="btn btn-warning text-light fw-bold">
          Sign up
        </button>
      </>
    );
  }

  const onlineAlert = ()=>{
    return (
      <>
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill"/></svg>
          <div>
            User is online
          </div>
        </div>
      </>
    )
  }

  const offlineAlert = ()=>{
    return (
      <>
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
          <div>
            User is offline
          </div>
        </div>
      </>
    )
  }

  const isLoggedIn = useSelector(
    (state: RootState) => state.userLogin.userLoggedIn
  );
  const NavButton = isLoggedIn ? logoutButton() : loginOptions();
  const UserStatusAlert = userStatus ? onlineAlert() : offlineAlert();
  return (
    <nav className="navbar navbar-expand-lg border-body">
      {UserStatusAlert}
      <div className="container">
        <NavLink to={"/"} className="mb-0 fs-1 heading-logo-font nav-link text-warning">
          NoteXchange
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-lg-4">
            <li className="nav-item ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-warning" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-warning" : ""}`
                }
              >
                About
              </NavLink>
            </li>
            {isLoggedIn && <>
            <li className="nav-item ">
              <NavLink
                to="/notes"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-warning" : ""}`
                }
              >
                Notes
              </NavLink>
            </li>
            <li className="nav-item"><NavLink
                to="/transactions"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-warning" : ""}`
                }
              >
                Trade book
              </NavLink></li>
              <li className="nav-item"><NavLink
                to="/cash-flow"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-warning" : ""}`
                }
              >
                Cash flow
              </NavLink></li>
              <li className="nav-item"><NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-warning" : ""}`
                }
              >
                My profile
              </NavLink></li>
              </>}
              
          </ul>
          <div className="d-flex gap-2 ms-auto" role="Login and Logout">
            {NavButton}
          </div>
        </div>
      </div>
    </nav>
  );
}
