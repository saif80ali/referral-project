import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/signup.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { postMethod } from "../services/apiCallService";
import { setLoader } from "../store/features/loaderState";
import { setUserLoggedIn } from "../store/features/loginState";
import { setToaster } from "../store/features/toasterState";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  function setAuthToken(token: string) {
    if (token.length) {
      localStorage.setItem("token", token);
      dispatch(setUserLoggedIn(true));
      navigate("/");
    }
  }

  const onSignupSubmit: SubmitHandler<IFormInput> = async (data) => {
    dispatch(setLoader(true));
    postMethod("auth/createuser", data)
      .then((response: any) => {
        if (response.data.success) {
          dispatch(setLoader(false));
          dispatch(
            setToaster({
              type: "success",
              message: "Signup successful!",
              time: 1000,
            })
          );
          setAuthToken(response.data.signedToken);
        }
      })
      .catch((error: any) => {
        dispatch(setLoader(false));
        let message = error.response?.data?.errors ?? "Something went wrong";
        dispatch(setToaster({ type: "error", message: message, time: 2000 }));
      });
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center flex-wrap-reverse w-100">
        <form className="flex-1" onSubmit={handleSubmit(onSignupSubmit)}>
          <h2 className="mt-3">Sign up to use NoteXchange</h2>
          <div className="mt-3">
            <input
              type="string"
              {...register("name", {
                required: { value: true, message: "Name is required" },
                pattern: {
                  value: /^[A-Za-z]+([ '-][A-Za-z]+)*$/,
                  message: "Enter valid full name",
                },
              })}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Full name"
              id="userFullName"
              aria-describedby="full name"
            />
          </div>
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
          <div className="mt-3">
            <input
              type="string"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter valid email",
                },
              })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email address"
              id="userEmail"
              aria-describedby="emailHelp"
            />
          </div>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}

          <div className="mt-3">
            <input
              id="userPassword"
              type="password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 8,
                  message: "Password must be of atleast 8 characters",
                },
                maxLength: 150,
              })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className="btn btn-warning d-flex align-items-center justify-content-center w-100 mt-3"
          >
            <span className="text-light">Sign up</span>
          </button>
        </form>
        <div className="flex-1 d-none d-md-block">
          <img src={signupImage} className="w-100 pb-2" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
