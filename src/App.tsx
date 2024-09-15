import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store.ts';
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/Toaster.tsx';
import { LoginModal } from './modal/LoginModal';
import Header from './components/Header.tsx'
import HeroBanner from './components/HeroBanner';
import Transactions from './components/Transactions';
import NewEntryForm from './components/NewEntryForm.tsx';
import About from './components/About.tsx';
import NotesDashboard from './components/NotesDashboard.tsx';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HeroBanner/>}/>
        <Route path="about" element={<About/>}/>
        <Route path='notes' element={<NotesDashboard/>}/>
        <Route path="transactions" element={<Transactions/>}/>
        <Route path="new-entry" element={<NewEntryForm/>}/>
      </Routes>
      <Footer></Footer>
      <LoginModal></LoginModal>
      <Toaster></Toaster>
    </Provider>
  )
}

export default App
