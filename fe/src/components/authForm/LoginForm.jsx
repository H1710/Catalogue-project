import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postAPI } from "../../utils/FetchData";
import { loginRoute } from "../../utils/APIRoute";
import { seft } from "../../redux/reducers/authReducer";
// import GoogleLogin from "react-google-login";

// const clientId =
//   "157579947849-fpas1tonu8jj9dbevcpbqavhi2h1m5u5.apps.googleusercontent.com";

const onSuccess = (res) => {
  console.log("Success", res.profileObj);
};

const onFailure = (res) => {
  console.log("Failed", res);
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const LoginForm = ({setState, setOpenAuthForm }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(values);
  };

  const { mutate, isLoading: loadingLogin } = useMutation({
    mutationFn: (info) => postAPI(loginRoute, info),
    onError: (error) => {
      let errorMessage = "Incorrect email or password";

      if (error.response && error.response.data && error.response.data.errors) {
        const emailError = error.response.data.errors.email;
        const passwordError = error.response.data.errors.password;

        if (emailError) {
          errorMessage = emailError;
        } else if (passwordError) {
          errorMessage = passwordError;
        }
      }

      setErrorMessage(errorMessage);
    },
    onSuccess: (data) => {
      dispatch(seft({ ...data.data.user }));
      localStorage.setItem("signed", "catalogue-app");
      setOpenAuthForm(false);
      // Replace with your success handling logic
      navigate("/"); // Or wherever you want to redirect the user after login
    },
  });

  return (
    <div className="px-12 py-6 rounded-xl">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setErrorMessage(null);
          mutate(values);
        }}
      >
        <Form className="mt-6">
          <div className="my-4 text-sm">
            <h1 class="font-medium text-2xl text-center">Login</h1>
            <label htmlFor="email" className="block text-black">
              Email
            </label>
            <Field
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div className="my-4 text-sm">
            <label htmlFor="password" className="block text-black">
              Password
            </label>
            <Field
              id="password"
              type="password"
              name="password"
              className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-xs mt-2">{errorMessage}</div>
          )}
          <div class="flex justify-end mt-2 text-xs text-gray-600">
            <a href="#">Forget Password?</a>
          </div>
          <div class="flex gap-2 mt-7">
            <div
              onClick={() => {
                setOpenAuthForm(false);
              }}
              className="cursor-pointer  flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-300 w-full border border-green"
            >
              Cancel
            </div>
            <button
              onClick={() => {
                // Add your login logic here.
              }}
              className="flex-1 text-center  text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400"
            >
              Login
            </button>
          </div>
          <div class="mt-4 text-center flex items-center justify-center">
            <div class="flex items-center">
              <p class="flex justify-center text-xs text-gray-600 mt-[3px]">
                Do you have no account?
              </p>
              <a
                onClick={() => setState("register")}
                class="flex justify-center text-[#3386ff] text-sm font-medium ml-1 cursor-pointer"
              >
                Register
              </a>
            </div>
          </div>

          {/* <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText='Sign in with Google'
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
        /> */}
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
