import { Dialog, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ServicePackage from "../ServicePackage";
import { ToastContainer, toast } from "react-toastify";

const TemplateList = ({ user, templateList, isLoadingTemplateData }) => {
  const navigate = useNavigate();
  // const [showServiePackages, setShowServiePackages] = useState(false);
  // const [isPremium, setIsPremium] = useState(false)
  // console.log(user)
  const [isSuggest, setIsSuggest] = useState(false)
  console.log(isSuggest)
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const handleDesign = (id) => {
    let daysDifference = 0;
    let remainingDayofService = 0;
    const length = user.orders.length;
    if (length !== 0) {
      const dateBuyService = new Date(user.orders[length - 1].createdAt);
      const currentDate = new Date();
      const timeDiff = currentDate.getTime() - dateBuyService.getTime();

      daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      remainingDayofService = user.orders[length - 1].service_package.remain_day;


    }

    if (remainingDayofService === 0) {
      toast.error("You need buy Premium to use this template", toastOptions);
    } else if (daysDifference <= remainingDayofService) {
      navigate(`/design/preview/${id}`);
    } else {
      toast.error("You need buy Premium to use this template", toastOptions);
    }
    // navigate(`/design/preview/${id}`);

  }
  return (
    <>
      <div className="content col-span-full select-none text-[18px] flex justify-start pb-2 font-bold">
        Template
      </div>
      <div className="w-full grid grid-cols-4 gap-8">
        {isLoadingTemplateData ? (
          <div className="flex space-x-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="inline">
                <Skeleton width={349} height={280} className="rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {templateList &&
              templateList.map((template, index) => (
                template.status === 'Accepted' && <div key={index} className="relative">
                  <div className="absolute"> <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // strokeWidth={1.5}
                    viewBox="0 0 16 16"
                    className="h-6 w-6"
                  >
                    <path
                      fill="rgb(255,153,0)"
                      d="M7.51 4.87C7.01 6.27 6.45 6.95 5.94 7c-.57.07-1.07-.18-1.54-.8a.54.54 0 0 0-.1-.1 1 1 0 1 0-.8.4l.01.12.82 3.24A1.5 1.5 0 0 0 5.78 11h4.44a1.5 1.5 0 0 0 1.45-1.14l.82-3.24a.54.54 0 0 0 .01-.12 1 1 0 1 0-.8-.4.54.54 0 0 0-.1.09c-.49.62-1 .87-1.54.81-.5-.05-1.04-.74-1.57-2.13a1 1 0 1 0-.98 0zM11 11.75a.5.5 0 1 1 0 1H5a.5.5 0 1 1 0-1h6z"
                    ></path>
                  </svg>
                  </div>
                  <div
                    className="w-full flex justify-center items-center bg-[#eeeeef] rounded-md p-4"
                    key={index}
                    onClick={() => {
                      handleDesign(template.id);

                    }}
                  >
                    <div className="h-full w-full flex items-center justify-center group cursor-pointer rounded-md ">
                      <img
                        src={template.thumbnail}
                        alt=""
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>

                  </div>
                  <div>
                    <p className="font-semibold text-[14px] mt-[10px]">
                      {template.name}
                    </p>
                  </div>
                  <p className=" font-normal text-[14px] mt-2">
                    A5 - horizontal
                  </p>
                </div>

              ))}
          </>
        )}
      </div>
      <ToastContainer />
      {/* {isSuggest && (
        // <p>hihiii</p>
        <Dialog open={isSuggest} onClose={() => setIsSuggest(false)}>
          <Dialog.Panel>
            <Dialog.Title>Suggest buy Premium</Dialog.Title>
            <Dialog.Description>
              You need to buy the Premium package to design this template! You can click on the sidebar and choose "Try Premium" to do this.
            </Dialog.Description>
            <button onClick={() => setIsSuggest(false)}>Close</button>
          </Dialog.Panel>
        </Dialog>
      )} */}

    </>
  );
};

export default TemplateList;
