// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseInit = ()=> {
    const firebaseConfig = {
        apiKey: "AIzaSyDFRsD9AWyr7UcUrvn5LhTuCA3CyhshaJo",
        authDomain: "notexchange-saif-6e5fd.firebaseapp.com",
        projectId: "notexchange-saif-6e5fd",
        storageBucket: "notexchange-saif-6e5fd.appspot.com",
        messagingSenderId: "820082855871",
        appId: "1:820082855871:web:25dbaa7684d869a1fa5b0a",
        measurementId: "G-86DHFM5WEF"
      };
      
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
}
