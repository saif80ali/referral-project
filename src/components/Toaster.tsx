import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import {useEffect, useState} from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import {ToasterDataModel} from '../models/toasterDataModel';
import Alert from '@mui/material/Alert';

export function Toaster() {
  const toaster:ToasterDataModel = useSelector((state: RootState) => state.toaster);
  const [open, setOpen] = useState(false);
   useEffect(()=> {
    setOpen(true);
   }, [toaster]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {!!toaster.type && <Snackbar open={open} autoHideDuration={toaster.time || 3000} onClose={handleClose} anchorOrigin={{ vertical:"bottom", horizontal: "right" }} >
        <Alert
          onClose={handleClose}
          severity={toaster.type}
          variant="filled"
          sx={{ width: '100%' }}
          
        >
          {toaster.message}
        </Alert>
      </Snackbar>}
    </>
  );
}