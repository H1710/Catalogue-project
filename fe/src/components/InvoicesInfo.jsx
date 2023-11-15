import React, { Fragment, useCallback, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import CustomButton from './common/Button';

export default function InvoicesInfo({
  isShowInvoice,
  setIsShowInvoice,
  user,
  infoInvoice,
  lsPack,
  setIsPremium
}) {
  const [isPaid, setIsPaid] = useState(false);
  const currentDate = Date.now();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(currentDate);
  const temp = [];
  temp.push(
      lsPack.find((item) => item.id.toString() === infoInvoice.packageId),
      );
      const expiryDate = new Date(currentDate + temp[0].remainingDay * 24 * 60 * 60 * 1000);
      const formattedExpiryDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(expiryDate);
  const orderInfo = {
    userId: user.id,
    packageId: parseInt(infoInvoice.packageId),
  };
  const handlePay = useCallback(async () => {
    try {
      const rs = await axios
        .post('http://localhost:5000/api/v1/order/add-order', orderInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Error to paying order');
          } else {
            setIsPaid(true);
            setIsPremium(true)
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [orderInfo]);

  return (
    <Transition appear show={isShowInvoice} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsShowInvoice(false)}
      >
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
          <div className="flex min-h-full  items-center justify-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-min-[400px]  min-h-[400px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-[25px] font-semibold leading-6 text-gray-900 flex items-center justify-center"
                >
                  ORDER INFORMATION {!isPaid && 'PREVIEW'}
                </Dialog.Title>
                <div className="mt-2 flex flex-col grid justify-items-stretch">
                  <div className="justify-self-end px-4  min-w-[200px]">
                    Time: {formattedDate}
                  </div>
                  <div className="flex flex-row justify-between ">
                    <div className="user mt-1 mb-2 min-w-[300px] ">
                      <div className="font-semibold "> USER INFORMATION</div>
                      <div>Username: {user.name}</div>
                      <div>Email: {user.email}</div>
                    </div>

                    <div className="card mt-1 min-w-[200px]">
                      <div className="font-semibold "> PAYING INFORMATION </div>
                      <div>Card number: {infoInvoice.cardNumber}</div>
                      <div>Security Code: {infoInvoice.security}</div>
                      <div>Expiry day: {infoInvoice.expiry}</div>
                    </div>
                  </div>
                  <div className="total mt-1 font-semibold  ">
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        size="medium"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              No.
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                              Name
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                              Description
                            </TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                              Cost
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>01</TableCell>
                            <TableCell align="left">{temp[0].name}</TableCell>
                            <TableCell align="left">
                              You can use all productivity to {formattedExpiryDate}
                            </TableCell>
                            <TableCell align="left">{temp[0].cost}$</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                              TOTAL
                            </TableCell>
                            <TableCell>{temp[0].cost}$</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
                 

                <div className="mt-4 flex justify-end gap-4">
                 {isPaid && <Alert  severity="success">Paying successfully</Alert>} 
                  {!isPaid && (
                   <>
                        <CustomButton
                          classContent="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          handleClick={handlePay}
                          text="Pay"
                        />
                        <CustomButton
                        text="Cancel"
                        classContent="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        handleClick={() => setIsShowInvoice(false)}
                      />
                   </>
                    
                  )}
                  {isPaid && <CustomButton
                        text="Close"
                        classContent="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        handleClick={() => setIsShowInvoice(false)}
                      />}
                  
                   
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
