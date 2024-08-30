import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast';
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const Toaster = () => {
    const toaster:any[] = useSelector((state: RootState) => state.toaster);
    return (
        <>
            {!!toaster.length && <ToastContainer position='bottom-end' className='mb-3 me-4'>
            <Toast
            className="d-inline-block m-1 mb-3"
            // bg={variant.toLowerCase()}
            key={"idx"}
            autohide={true}
            delay={2000}
            >
            <Toast.Body className='text-white'>
                {/* {message} */}
            </Toast.Body>
            </Toast>
            </ToastContainer>}
        </>
    )
}