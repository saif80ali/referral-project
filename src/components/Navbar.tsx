import '../style/Navbar.scss';
import { toggleLoginModal } from '../store/features/login/loginState'
import { useDispatch } from 'react-redux';

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="navbar border-body">
      <div className="container">
        <span className="mb-0 fs-1 heading-logo-font">ReferMe</span>
        <div className="d-flex gap-2" role="search">
          <button type="button" className="btn btn-outline-dark border-0 fw-bold" onClick={()=>{dispatch(toggleLoginModal())}}>Sign in</button>
          <button type="button" className="btn btn-success fw-bold">Sign up</button>
        </div>
      </div>
    </nav>
  );
}
