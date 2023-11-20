import React, { Fragment, useCallback, useState } from "react";
import {
  Alert,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  confirmOTPRoute,
  firstStepRegisterationRoute,
  setInfoRoute,
} from "../../utils/APIRoute";
import { useMutation } from "react-query";
import { postAPI } from "../../utils/FetchData";
import { validRegister } from "../../utils/Validate";
import { ToastContainer, toast } from "react-toastify";
import OtpInput from "react-otp-input";
import { Combobox, Transition } from "@headlessui/react";
import { Countries } from "../../shared/Countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronCircleDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const steps = ["Account", "Confirm", "Information"];
const RegisterForm = ({ setState, setOpenAuthForm }) => {
  const countries = Countries.map((country) => country.name);
  const [currentStep, setCurrentStep] = useState(0);
  const [OTPCode, setOTPCode] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  console.log(values);

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const { mutate: firstStep, isLoading: loadingFirstStep } = useMutation({
    mutationFn: (info) => {
      return postAPI(firstStepRegisterationRoute, info);
    },
    onError: (error) => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      // toast.success(data.data.message, toastOptions);
      setCurrentStep(1);
    },
  });

  const { mutate: submitOTP, isLoading: loadingSubmitOTP } = useMutation({
    mutationFn: (info) => {
      return postAPI(confirmOTPRoute, {
        email: values.email,
        OTPCode: OTPCode,
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      // toast.success(data.data.message, toastOptions);
      setCurrentStep(2);
    },
  });

  const { mutate: submitInfo, isLoading: loadingSubmitInfo } = useMutation({
    mutationFn: (info) => {
      return postAPI(setInfoRoute, {
        name: values.name,
        email: values.email,
        country: values.country,
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      toast.success(data.data.message, toastOptions);
      setTimeout(() => {
        setState("login");
    }, 3000); 
    },
  });

  const submitFirstStep = async (e) => {
    e.preventDefault();
    const check = await validRegister(values);

    if (check.errLength > 0) {
      toast.error(check.errMsg[0], toastOptions);
    } else {
      firstStep(values);
    }
  };

  const submitOTPCode = async (e) => {
    e.preventDefault();
    submitOTP(OTPCode);
  };

  const submitUserInfo = async (e) => {
    e.preventDefault();
    submitInfo();
  };
  const handleChange = (e) => {
    let value = e.target?.files ? e.target.files : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  // console.log(infoUser);
  const updateCountry = (country) => {
    setValues({
      ...values,
      ["country"]: country,
    });
  };

  return (
    <div className=" relative items-center justify-center w-full h-full">
      <div className="px-12 py-6 rounded-xl">
        <h1 className="font-medium text-2xl text-center mb-4 ">Register</h1>
        <Stepper activeStep={currentStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {currentStep === 0 && (
          <>
            <form className="mt-6" onSubmit={submitFirstStep}>
              <div className="my-4 text-sm">
                <TextField
                  required
                  type="email"
                  label="Email"
                  className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="my-4 text-sm">
                <TextField
                  required
                  type="password"
                  label="Password"
                  className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="my-4 text-sm">
                <TextField
                  required
                  type="password"
                  label="Confirm Password"
                  className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-20">
                {/* <div className="flex-1 text-center text-black p-3 duration-300 rounded-sm w-full border border-green">
                  Previous
                </div> */}
                <button
                  type="submit"
                  disabled={loadingFirstStep}
                  className={`flex-1 text-center text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400`}
                >
                  {loadingFirstStep ? (
                    <>
                      Loading...
                      <CircularProgress size={20} />
                    </>
                  ) : (
                    <p>Next</p>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
        {currentStep === 1 && (
          <div>
            <Alert className="mt-2">
              An OTP code has been sent to your email. Please check your inbox.
            </Alert>
            <form className="mt-4" onSubmit={submitOTPCode}>
              <div className="my-4 text-sm grid justify-items-stretch">
                <label
                  htmlFor="email"
                  className="block text-black text-left p-2 "
                >
                  Verify OTP code
                </label>

                <div className="justify-self-center">
                  <OtpInput
                    value={OTPCode}
                    onChange={setOTPCode}
                    numInputs={6}
                    isInputNum
                    renderSeparator={<span> </span>}
                    renderInput={(inputProps, index) => (
                      <input
                        {...inputProps}
                        style={{ ...inputProps.style, width: "3rem" }}
                        className={`border-2 h-12 items-center justify-center text-center w-10 ${
                          index === 0 ? "" : "ml-2 "
                        }`}
                      />
                    )}
                  />
                </div>
                <div className="flex justify-end mt-2 text-xs text-gray-600">
                  <a href="#">Resend OTP</a>
                </div>
              </div>

              <div className="flex gap-20 mt-4">
                {/* <div
                    onClick={() => setCurrentStep(1)}
                    className="cursor-pointer flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                  >
                    Previous
                  </div> */}
                <button
                  type="submit"
                  disabled={loadingSubmitOTP}
                  className={`flex-1 text-center rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400`}
                >
                  {loadingSubmitOTP ? (
                    <>
                      Loading...
                      <CircularProgress size={20} />
                    </>
                  ) : (
                    <p>Next</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {currentStep === 2 && (
          <form
            onSubmit={submitUserInfo}
            className="grid justify-items-stretch"
          >
            <div className="my-4 text-sm">
              <TextField
                required
                type="text"
                label="Name"
                className="rounded-md px-4 py-3 mt-1 focus:outline-none  bg-[#F3F4F6] w-full"
                placeholder="name"
                name="name"
                onChange={handleChange}
              />
            </div>

            <Combobox
              value={country}
              onChange={(country) => {
                setCountry(country);
                updateCountry(country);
              }}
            >
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full  bg-[#F3F4F6] py-2 pl-3 pr-10   leading-5 text-black focus:ring-1 h-14 text-[17px] hover:ring-1  "
                    // displayValue={'country'}
                    // onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <p className="p-2 text-gray-800 text-[16px]">Country *</p>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {countries.length === 0 ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      countries.map((country, index) => (
                        <Combobox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-teal-600 text-white"
                                : "text-gray-900"
                            }`
                          }
                          value={country}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {country}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-teal-600"
                                  }`}
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
            <button
              type="submit"
              disabled={loadingSubmitOTP}
              className={`  mt-4 text-center text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400 justify-self-end`}
            >
              {loadingSubmitOTP ? (
                <>
                  Loading...
                  <CircularProgress size={20} />
                </>
              ) : (
                <p>Save</p>
              )}
            </button>
          </form>
        )}
        <div class="mt-4 text-center flex items-center justify-center">
          <div class="flex items-center">
            <p class="flex justify-center text-xs text-gray-600 mt-[3px]">
              Already have an account?
            </p>
            <a
              onClick={() => setState("login")}
              class="flex justify-center text-[#3386ff] text-sm font-medium ml-1 cursor-pointer"
            >
              Login
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
