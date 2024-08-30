import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { toggleLoginModal } from '../store/features/loginState';
import Modal from 'react-bootstrap/Modal';
import loginImage from '../assets/loginVectorImage.png';
import whiteSpinner from '../assets/White loader.svg';

import { useForm, SubmitHandler } from "react-hook-form";
import { postMethod } from "../services/apiCallService";


interface IFormInput {
  email: string
  password: string
}

export function LoginModal() {
  const showModal = useSelector((state: RootState) => state.userLogin.loginModal);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const response = postMethod("auth/login", data);
    console.log("response", response);
    // setLoading(!loading);
    console.log(data);
  }

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput: HTMLInputElement | null = document.getElementById("userPassword") as HTMLInputElement;
    if (event.target.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
  }
  const handleModalClose = ()=> {
    dispatch(toggleLoginModal());
    reset();
  }
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
        </Modal.Header>
        <Modal.Body className='d-flex align-items-center gap-1 pt-0'>
            <div className='flex-1'>
                <div><img src={loginImage} className='w-100 pb-2' /></div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type="string" {...register("email", { required: {value: true, message:"Email is required"},pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Enter valid email"}})} className={`form-control ${errors.email ? 'is-invalid':''}` } disabled={loading} placeholder='Email address' id="userEmail" aria-describedby="emailHelp"/>
                    </div>
                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}

                    <div className="mt-3">
                        <input id="userPassword" type="password" {...register("password", { required: {value: true, message:"Password is required"},minLength:{value:8, message: "Password must be of atleast 8 characters"}, maxLength: 150, pattern: {value: /^(?=.*[0-9])(?=.*[!@#$%^&*.])[0-9a-zA-Z!@#$%^&*.]{8,}$/, message: "Password must contain at least one number and one special character (!@#$%^&*)"}})}  className={`form-control ${errors.password ? 'is-invalid':''}`} disabled={loading} placeholder='Password'/>
                    </div>
                    {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                    <div className="mb-3 mt-2 form-check">
                        <input id='showPassword' type="checkbox" className="form-check-input" onChange={(event)=>{handleOnchange(event)}}  />
                        <label className="form-check-label" htmlFor="showPassword">Show password</label>
                    </div>

                    <button type="submit" className="btn btn-warning d-flex align-items-center justify-content-center w-100" disabled={loading}>
                        {!loading && <span className='text-light'>Log in</span>}
                        {loading && <img style={{height:'24px'}} src={whiteSpinner} alt='Loading icon'/>}
                    </button>
                </form>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}