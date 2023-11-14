import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import CustomButton from '../common/Button';

const steps = ['Step 1', 'Step 2', 'Step 3'];
const RegisterForm = ({ setState, setOpenAuthForm }) => {
  const [activeStep, setActiveStep] = useState(0);
  // const [infoUser, setInfoUser] = useState( );

  const handleNext = () => {
    if (activeStep === 0) {
      console.log('submit nef');

      formik.handleSubmit();
    }
    setActiveStep((prev) => prev + 1);
  };
  console.log(activeStep);

  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep((pre) => pre - 1);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: '',
      otpCode: '',
      role: 2,
      typeOfRegister: 'Normal',
    },
    onSubmit: (values) => {
      
      console.log('login', values);
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required').email('Must be a valid email'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string().required('Required'),
      otpCode: Yup.string().required('Required'),
    }),
  });

  // console.log(infoUser);

  return (
    <>
      <div className="px-12 py-6 rounded-xl">
        <h1 className="font-medium text-2xl text-center mb-2">Register</h1>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          {activeStep === 0 && (
            <>
              <div className="my-4 text-sm">
                <TextField
                  required
                  type="email"
                  label="Email"
                  className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && (
                  <Typography variant="caption" color="red">
                    {formik.errors.email}
                  </Typography>
                )}
              </div>
              <div className="my-4 text-sm">
                <TextField
                  required
                  type="password"
                  label="Password"
                  className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && (
                  <Typography variant="caption" color="red">
                    {formik.errors.password}
                  </Typography>
                )}
              </div>
              <div className="my-4 text-sm">
                <TextField
                  required
                  type="password"
                  label="Confirm Password"
                  className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                {formik.errors.confirmPassword && (
                  <Typography variant="caption" color="red">
                    {formik.errors.confirmPassword}
                  </Typography>
                )}
              </div>
            </>
          )}
          {activeStep === 1 && <div>hi</div>}
          {activeStep === 2 && <div>he</div>}

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
        {activeStep === steps.length - 1 ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </>
        ) : (
          <div className="flex gap-2 mt-7">
            <CustomButton
              text={'Back'}
              disabled={activeStep === 0}
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
            />
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterForm;
