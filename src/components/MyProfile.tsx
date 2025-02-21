import { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { Person, Email, CalendarToday, Lock } from "@mui/icons-material";
import { getMethod } from "../services/apiCallService";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../store/features/loaderState";
import { setToaster } from '../store/features/toasterState';
import { useForm, SubmitHandler } from "react-hook-form";
import { postMethod } from '../services/apiCallService';
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import whiteSpinner from '../assets/White loader.svg';

function MyProfile() {
  const dispatch = useDispatch();
  let history = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userLogin.userLoggedIn
  );

  const [user, setUser] = useState({} as User);

  interface User {
    name: string;
    email: string;
    date: Date;
  }

  interface ChangePassword {
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePassword>();

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails();
    } else {
      history("/");
    }
  }, []);

  function getUserDetails() {
    dispatch(setLoader(true));
    getMethod("auth/getuser")
      .then((response) => {
        setUser(response.data);
        dispatch(setLoader(false));
      })
      .catch(() => {
        dispatch(setLoader(true));
      });
  }

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    reset();
  };
  const handleOpen = () => setShowModal(true);

  const handleChangePassword: SubmitHandler<ChangePassword> = async (data: ChangePassword) => {
    setLoading(true);
    postMethod("auth/changepassword", {"password": data.password}).then((response: any) => {
      if (response.data.success) {
        handleClose()
        dispatch(setToaster({type:"success", message: "Password updated successfully!", time:1000}));
      } else {
        dispatch(setToaster({type:"error", message: response?.data?.error, time:1000}));
      }
    }).catch((error:any) => {
      dispatch(setToaster({type:"error", message: "Something went wrong", time:1000}));
      console.error(error);
    }).finally(() => {
      setLoading(false);
    }); 
  }

  return (
    <Container className="my-5 d-flex justify-content-center">
      <div className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="avatar bg-dark text-white d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', borderRadius: '50%' }}>
            <Person style={{ fontSize: 40 }} />
          </div>
        </div>
        <h3 className="text-center mb-4">My Profile</h3>
        <hr />
        <div className="row mb-3">
          <div className="col-4 fw-bold d-flex align-items-center">
            <Person className="me-2" /> Name:
          </div>
          <div className="col-8">{user.name}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold d-flex align-items-center">
            <Email className="me-2" /> Email:
          </div>
          <div className="col-8">{user.email}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 fw-bold d-flex align-items-center">
            <CalendarToday className="me-2" /> Creation Date:
          </div>
          <div className="col-8">{new Date(user.date).toLocaleDateString()}</div>
        </div>
        <div className="text-center mt-4">
          <Button variant="warning" className="w-100" onClick={handleOpen}>
            <Lock className="me-2" /> Change Password
          </Button>
        </div>
      </div>

      {/* Modal for Changing Password */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleChangePassword)}>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 8,
                  message: "Password must be of atleast 8 characters",
                },
                maxLength: 150
              })} />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="confirmPassword" placeholder="Confirm password"
              {...register("confirmPassword", {
                required: { value: true, message: "Confirm password is required" },
                minLength: {
                  value: 8,
                  message: "Confirm password must be of atleast 8 characters",
                },
                maxLength: 150,
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "Your passwords do no match";
                  }
                },
              })} />
              {errors.confirmPassword && (
                <span className="text-danger">{errors.confirmPassword.message}</span>
              )}
            </Form.Group>
            <Button disabled={loading} variant="warning" type="submit" className="w-100">
              {loading ? <img style={{height:'24px'}} src={whiteSpinner} alt='Loading icon'/> : <span className='text-light'>Change password</span>}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default MyProfile;
