import { toggleLoginModal } from "../store/features/loginState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import productivity from "../assets/productivity.svg";
import trading from "../assets/trading.svg";
import manageNotes from "../assets/manage-notes.svg";
import dailyNotes from "../assets/daily-notes.svg";

export default function HeroBanner() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userLogin.userLoggedIn
  );
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="row align-items-center my-5">
        <div className="col-md-6">
          <h1>Welcome to iNotebook</h1>
          <p className="lead">
            Organize your life effortlessly! iNotebook helps you take daily
            notes, track tasks, and stay on top of your stock trading activities
            in one seamless platform.
          </p>
          
          {!isLoggedIn && <button className="btn btn-warning text-light btn-lg mt-3" onClick={()=> {dispatch(toggleLoginModal())}}>
            Login to Your Account
          </button>}
        </div>
        <div className="col-md-6 text-center">
          <img
            src={productivity}
            alt="Productivity"
            className="img-fluid rounded"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="row text-center justify-content-center mb-5">
        <div className="col-md-6">
          <h2>Daily Notes</h2>
          <p>
            Capture your thoughts, keep track of important tasks, and never
            forget an idea. Whether it's work or personal, iNotebook helps you
            stay organized and productive.
          </p>
          <img
            src={manageNotes}
            alt="Daily Notes"
            className="img-fluid rounded my-3"
          />
        </div>

        <div className="col-md-6">
          <h2>Stock Trading</h2>
          <p>
            Easily monitor your investments and trading history. iNotebook keeps
            your stock trading records safe, ensuring you have a clear picture
            of your financial journey.
          </p>
          <img
            src={trading}
            alt="Stock Trading"
            className="img-fluid rounded my-3"
          />
        </div>
        <div className="col-md-6">
          <h2>Cash Flow Tracking</h2>
          <p>
            Manage your cash flow by keeping track of your income and expenses. Stay on top of your budget and maintain financial stability with ease.
          </p>
          <img
            src={dailyNotes}
            alt="Cash Flow"
            className="img-fluid rounded my-3"
            style={{maxHeight: '450px'}}
          />
        </div>
      </section>
    </div>
  );
}
