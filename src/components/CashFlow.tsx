import "../style/cashflow.scss";
import siteUnderMaintainance from "../assets/under-maintaince-page.svg"

export default function CashFlow() {
  return (
    <div className="container">
      <img className="w-100 maintainance-image" src={siteUnderMaintainance} />
      <h3 className="text-center">This page is under development</h3>
    </div>
  );
}
