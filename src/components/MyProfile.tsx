import { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { Person, Email, CalendarToday, Lock } from "@mui/icons-material";
import { getMethod } from "../services/apiCallService";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../store/features/loaderState";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

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
      .catch((error) => {
        console.error(error);
        dispatch(setLoader(true));
      });
  }

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Password changed successfully!");
    handleClose();
  };

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
          <Form onSubmit={handleChangePassword}>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Button variant="warning" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default MyProfile;
