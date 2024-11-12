import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store.ts';
import { Provider } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from './components/Toaster';
import { LoginModal } from './modal/LoginModal';
import Header from './components/Header'
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import NewEntryForm from './components/NewEntryForm';
import About from './components/About';
import NotesDashboard from './components/NotesDashboard';
import Footer from './components/Footer';
import Loader from './components/Loader';
import PageNotFound from './components/PageNotFound';
import MyProfile from './components/MyProfile';
import CashFlow from './components/CashFlow.tsx';
import SignUp from './components/SignUp.tsx';

function App() {
  return (
    <Provider store={store}>
      <Loader></Loader>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="about" element={<About/>}/>
        <Route path='notes' element={<NotesDashboard/>}/>
        <Route path="transactions" element={<Transactions/>}/>
        <Route path="cash-flow" element={<CashFlow/>}/>
        <Route path="new-entry" element={<NewEntryForm/>}/>
        <Route path="sign-up" element={<SignUp/>}/>
        <Route path="profile" element={<MyProfile/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer></Footer>
      <LoginModal></LoginModal>
      <Toaster></Toaster>
    </Provider>
  )
}

export default App
