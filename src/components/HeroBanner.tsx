import { toggleLoginModal } from '../store/features/loginState';
import { useDispatch } from 'react-redux';

export default function HeroBanner() {
  const dispatch = useDispatch();
  return (
    <div className="mt-2 container text-center non-loggedin-hero-banner">
      <h1 className="heading-logo-font fs-1">Land your dream job <span className="text-primary">3.5x</span><br></br>faster with a referral</h1>
      <button type="button" onClick={()=>{dispatch(toggleLoginModal())}} className="btn btn-primary btn-lg">Try now</button>
    </div>
  )
}
