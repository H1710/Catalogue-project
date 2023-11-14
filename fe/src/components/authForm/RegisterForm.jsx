import React, { useCallback, useState } from 'react';
import { CircularProgress, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import CustomButton from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';import {
  confirmOTPRoute,
  firstStepRegisterationRoute,
  setInfoRoute,
} from '../../utils/APIRoute';
import { useMutation } from 'react-query';
import { postAPI } from '../../utils/FetchData';
import { validRegister } from '../../utils/Validate';
import { ToastContainer, toast } from 'react-toastify';

const steps = ['Account', 'Confirm', 'Information'];
const RegisterForm = ({ setState, setOpenAuthForm }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [OTPCode, setOTPCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  console.log(values);
  

  const toastOptions = {
    // position: 'top-right',
    // autoClose: 3000,
    // pauseOnHover: true,
    // draggable: true,
    // theme: 'light',
    // type: 'error',
    
  };
  const { mutate: firstStep, isLoading: loadingFirstStep } = useMutation({
    mutationFn: info => {
      return postAPI(firstStepRegisterationRoute, info);
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
      setCurrentStep(1);
    },
  });

  const { mutate: submitOTP, isLoading: loadingSubmitOTP } = useMutation({
    mutationFn: info => {
      return postAPI(confirmOTPRoute, {
        email: values.email,
        OTPCode: OTPCode,
      });
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
      setCurrentStep(2);
    },
  });

  const { mutate: submitInfo, isLoading: loadingSubmitInfo } = useMutation({
    mutationFn: info => {
      return postAPI(setInfoRoute, {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
      });
    },
    onError: error => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: data => {
      toast.success(data.data.message, toastOptions);
      navigate('/login');
    },
  });

  const submitFirstStep = async( e) => {
    e.preventDefault();
    const check = await validRegister(values);
    
    if (check.errLength > 0) {
      toast.error(check.errMsg[0], toastOptions);
    } else {
      firstStep(values);
    }
  };

  const submitOTPCode = async e => {
    e.preventDefault();
    submitOTP(OTPCode);
  };

  const submitUserInfo = async e => {
    e.preventDefault();
    submitInfo();
  };
  const handleChange = e => {
    let value = e.target.files ? e.target.files : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }; 
  // console.log(infoUser);

  return (
    <div className=' relative items-center justify-center w-full h-full'>
      <div className="px-12 py-6 rounded-xl">
        <h1 className="font-medium text-2xl text-center mb-2">Register</h1>
        <Stepper activeStep={currentStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <form className="mt-6" onSubmit={submitFirstStep}  >
          {currentStep === 0 && (
            <>
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
                 
              </div><div className="flex gap-20">
                <div className="flex-1 text-center text-black p-3 duration-300 rounded-sm w-full border border-green">
                  Previous
                </div>
                <button
                  type="submit"
                  disabled={loadingFirstStep}
                  className={`flex-1 text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black flex justify-center items-center gap-2`}
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
               
            </>
          )}
          {currentStep === 1 && <div>hi</div>}
          {currentStep === 2 && <div>he</div>}

          {/* <div className="mt-4 text-center flex items-center justify-center">
            <div className="flex items-center">
              <p className="flex justify-center text-xs text-gray-600 mt-[3px]">
                Already have an account?
              </p>
              <a
                onClick={() => setState('login')}
                className="flex justify-center text-[#3386ff] text-sm font-medium ml-1"
              >
                Login
              </a>
            </div>
          </div> */}
        </form>
        {currentStep === steps.length - 1 ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </>
        ) : (
          <div className="flex gap-2 mt-7">
            {/* <CustomButton
              text={'Back'}
              disabled={currentStep === 0}
              classContent={
                'cursor-pointer rounded-md flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-300 w-full border border-green'
              }
              handleClick={handleBack}
            />
            <CustomButton
              text={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              classContent={
                'flex-1 text-center rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400'
              }
              handleClick={handleNext}
            /> */}
          </div>
        )}
      </div>
      <ToastContainer className={'absolute'}/> 
    </div>
  );
}

export default RegisterForm;
