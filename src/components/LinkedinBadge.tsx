import { useEffect } from "react";
import loadScript from "../utils/scriptLoader";
declare const window: any;

const LinkedinBadge = () => {
  useEffect(() => {
    const scriptUrl = "https://platform.linkedin.com/badges/js/profile.js";

    loadScript(scriptUrl)
      .then(() => {
        if (window.IN && window.IN.parse) {
          window.IN.parse();
        }
        console.log("External script loaded successfully");
      })
      .catch((error: any) => {
        console.error("Error loading external script:", error);
      });
  }, []);
  return (
    <div className="container my-5 d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-center mb-2">Created by</h2>
      <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="saif-ali-5ab917171" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/saif-ali-5ab917171?trk=profile-badge">SAIF ALI</a></div>
        <small className="text-muted">**If you do not see the Linkedin Badge please reload the page</small>
              
    </div>
  );
};

export default LinkedinBadge;
