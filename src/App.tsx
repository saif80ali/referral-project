import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store.ts';
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/Toaster.tsx';
import { LoginModal } from './modal/LoginModal';
import Header from './components/Header.tsx'
import HeroBanner from './components/HeroBanner';
import Dashboard from './components/Dashboard.tsx';
import NewEntryForm from './components/NewEntryForm.tsx';

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HeroBanner/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="new-entry" element={<NewEntryForm/>}/>
      </Routes>
      <LoginModal></LoginModal>
      <Toaster></Toaster>
    </Provider>
  )
}

export default App
