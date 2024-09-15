import '../style/loader.scss';
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import yellowSpinner from '../assets/Yellow loader.svg';

export default function Loader() {
    const showLoader = useSelector(
        (state:RootState) => state.loader.loaderState
    );
  return (
    <div id='Loader' style={{display: showLoader ? 'flex' : 'none'}}>
      <img className='spinner' src={yellowSpinner} alt='Spinner' />
    </div>
  )
}
