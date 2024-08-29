import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner';
import { LoginModal } from './modal/LoginModal';
import store from './store/store.ts';
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Navbar></Navbar>
      <HeroBanner></HeroBanner>
      <LoginModal></LoginModal>
    </Provider>
  )
}

export default App
