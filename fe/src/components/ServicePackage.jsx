import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../components/common/Button';
import { Divider, TextField, Typography } from '@mui/material';
import InvoicesInfo from './InvoicesInfo';

const lsPack = [
  {
    id: 2,
    name: 'Monthly Premium',
    remainingDay: 30,
    cost: 100,
  },
  {
    id: 3,
    name: 'Yearly Premium',
    remainingDay: 365,
    cost: 900,
  },
];

export default function ServicePackage({
  showServiePackages,
  setShowServiePackages,
  user,
  setIsPremium
}) {
  const [selectedRadio, setSelectedRadio] = useState(2);
  const [isShowOptionsPackage, setIsShowOptionsPackage] = useState(false);
  const [isShowInfoCard, setIsShowInfoCard] = useState(false);
  const [isShowInvoice, setIsShowInvoice] = useState(false);
  const [stateOfPopup, setStateOfPopup] = useState(0);

  function closeModal() {
    setShowServiePackages(false);
  }

  function openModal() {
    setShowServiePackages(true);
  }
  const handleOpenOptions = useCallback(() => {
    setIsShowOptionsPackage(true);
  }, []);
  const initInfo = {
    packageId: '2',
    cardNumber: '',
    security: '',
    expiry: '',
  };
  const [infoInvoice, setInfoInvoice] = useState(initInfo);
  const handleUpdateInfo = (e) => {
    if (e.target.name === 'packageId') {
      setSelectedRadio(e.target.value);
    }

    setInfoInvoice({ ...infoInvoice, [e.target.name]: e.target.value });
  };
  // console.log(infoInvoice);
  // const handleCreateInvoice = () => {
  //   closeModal();
  //   setIsShowInvoice(true);
  // };

  const handleNext = () => {
    setStateOfPopup((pre) => pre + 1);
  };

  const handlePre = () => {
    setStateOfPopup((pre) => pre - 1);
  };
  const formik = useFormik({
    initialValues: infoInvoice,
    onSubmit: (values) => {
      values.packageId = infoInvoice.packageId
      console.log(values)
      closeModal();
      setInfoInvoice(values);
      setIsShowInvoice(prev => !prev);
      console.log(isShowInvoice)
    },

    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required('Required.')
        .matches(/^[0-9]+$/, 'Must contain only number digits.')
        .min(16, 'Must be equal 16 degits')
        .max(16, 'Must be equal 16 degits'),
      security: Yup.string()
        .required('Required.')
        .matches(/^[0-9]+$/, 'Must contain only number digits.')
        .min(3, 'Must be equal 3 degits')
        .max(3, 'Must be equal 3 degits'),
      expiry: Yup.string()
        .required('Required.')
        .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Must be in MM/YYYY format.'),
    }),
  });
  return (
    <>
      <Transition appear show={showServiePackages} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg h-[390px]   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-normal leading-7 "
                  >
                    <div className="flex justify-between">
                      <div>
                        {stateOfPopup !== 0 && (
                          <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="pr-2 cursor-pointer"
                            onClick={handlePre}
                          />
                        )}
                        UPGRADE TO PREMIUM
                      </div>
                      <div
                        className="text-lg bg-[#110e1d99] text-white rounded-[50%] w-8 h-8 cursor-pointer flex justify-center items-center "
                        onClick={closeModal}
                      >
                        &times;
                      </div>
                    </div>
                    <p className="text-base leading-7    font-light">
                      Elevate Your Creativity Instantly
                    </p>
                  </Dialog.Title>

                  {stateOfPopup === 0 && (
                    <>
                      <div className="mt-2">
                        <p className="text-md text-[#0d1216]">
                          <strong>🚀 Exclusive Templates:</strong> Access a
                          curated collection of elite designs for a stunning and
                          unique touch to your projects.
                        </p>
                        <p className="text-md text-[#0d1216]">
                          <strong>📥 Unlimited Downloads:</strong> Break free
                          from limitations! Download as many templates as you
                          need to fuel your creative journey.
                        </p>

                        <p className="text-md text-[#0d1216]">
                          <strong>✏️ Advanced Editing:</strong> Dive into
                          precision design with advanced tools, putting ultimate
                          creative control at your fingertips.
                        </p>

                        <strong className="text-md text-[#0d1216]">
                          Ready to redefine your design game? Upgrade now and
                          let your creativity shine! 🌟🎨
                        </strong>
                      </div>

                      <div className="mt-4">
                        <CustomButton
                          classContent="inline-flex justify-center w-full rounded-md border border-transparent  px-4 py-2 text-md font-medium bg[--bg-button] hover:bg-[--bg-button-hover] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:text-white "
                          handleClick={handleNext}
                          text={'Start right now!'}
                        />
                      </div>
                    </>
                  )}
                  {stateOfPopup === 1 && (
                    <div className="">
                      <div className="mt-2 mb-5 grid justify-items-stretch ">
                        <div className="text-lg pb-2 font-semibold justify-self-center">
                          PACKAGE SERVICE
                        </div>
                        {lsPack.map((pack, i) => (
                          <div className="grid " key={i}>
                            <label className="flex flex-row justify-start items-start">
                              <input
                                type="radio"
                                name="packageId"
                                value={pack.id}
                                className="m-2"
                                checked={pack.id == selectedRadio}
                                onChange={handleUpdateInfo}
                              />
                              <div>
                                <strong>{pack.name}</strong>
                                <p className="text-gray-900 text-sm font-medium">
                                  {pack.cost}$
                                </p>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                      <Divider />

                      <div>
                        <CustomButton
                          text={'Next'}
                          classContent={'bg-[#8b3dff] text-white w-full mt-4 '}
                          handleClick={handleNext}
                        ></CustomButton>
                      </div>
                    </div>
                  )}
                  {stateOfPopup === 2 && (
                    <form onSubmit={formik.handleSubmit} className="">
                      <div className="mt-2 mb-4 grid justify-items-stretch">
                        <div className="text-lg pb-2 font-semibold justify-self-center">
                          CARD INFORMATION
                        </div>
                        <div className="flex gap-2 items-center  mt-2">
                          <label className="min-w-[100px]">Card number</label>
                          <TextField
                            name="cardNumber"
                            size="small"
                            required
                            value={formik.values.cardNumber}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.cardNumber && (
                            <Typography variant="caption" color="red">
                              {formik.errors.cardNumber}
                            </Typography>
                          )}
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                          <label className="min-w-[100px]">Securuty Code</label>
                          <TextField
                            name="security"
                            type="text "
                            size="small"
                            required
                            value={formik.values.security}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.security && (
                            <Typography variant="caption" color="red">
                              {formik.errors.security}
                            </Typography>
                          )}
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                          <label className="min-w-[100px]">Expiry day</label>
                          <TextField
                            name="expiry"
                            size="small"
                            required
                            value={formik.values.expiry}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.expiry && (
                            <Typography variant="caption" color="red">
                              {formik.errors.expiry}
                            </Typography>
                          )}
                        </div>
                      </div>

                      <Divider />
                      <CustomButton
                        text={'Next'}
                        type={'submit'}
                        classContent={'bg-[#8b3dff] text-white w-full mt-4 '}
                      ></CustomButton>
                    </form>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {isShowInvoice && (
        <InvoicesInfo
          isShowInvoice={isShowInvoice}
          setIsShowInvoice={setIsShowInvoice}
          user={user}
          infoInvoice={infoInvoice}
          lsPack={lsPack}
          setIsPremium={setIsPremium}
        />
      )}
    </>
  );
}
