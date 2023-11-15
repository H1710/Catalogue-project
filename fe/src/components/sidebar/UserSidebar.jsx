import { useEffect, useState } from 'react';
import MinidenticonImg from '../common/MinidenticonImg';
import ServicePackage from '../ServicePackage';

function AdminSidebar({ user }) {
  const [showServiePackages, setShowServiePackages] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(true);
  const categoryList = ['Education', 'Social media', 'Bussiness'];
  console.log(isPremium);
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
  console.log('Day', remainingDayofService, daysDifference);

  useEffect(() => {
    const checkIsPremium = () => {
      if (remainingDayofService === 0) {
        setIsPremium(false);
      } else if (daysDifference < remainingDayofService) {
        setIsPremium(true);
      } else {
        setIsPremium(false);
      }
    };
    checkIsPremium();
  }, [daysDifference]);

  return (
    <aside className="w-[250px] h-full flex flex-col fixed bg-white  border-r border-[#ccc] shadow p-4">
      <div className="rounded-[4px] mb-4 flex items-center gap-4">
        {user?.avatar ? (
          <img
            src={user?.avatar}
            className="w-12 h-12 rounded-[5px] object-cover cursor-pointer"
          />
        ) : (
          <MinidenticonImg
            username={user.name}
            className="w-14 rounded-full object-cover cursor-pointer border border-[#ccc]"
          />
        )}
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg">Person</p>
          <p className="text-md">Free</p>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-[230px]">
        {!isPremium && (
          <div
            className="cursor-pointer w-[230px] p-2 mb-4 hover:bg-gray-100 rounded-lg flex items-center gap-4"
            onClick={() => setShowServiePackages(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // strokeWidth={1.5}
              viewBox="0 0 16 16"
              className="h-8 w-8"
            >
              <path
                fill="rgb(255,153,0)"
                d="M7.51 4.87C7.01 6.27 6.45 6.95 5.94 7c-.57.07-1.07-.18-1.54-.8a.54.54 0 0 0-.1-.1 1 1 0 1 0-.8.4l.01.12.82 3.24A1.5 1.5 0 0 0 5.78 11h4.44a1.5 1.5 0 0 0 1.45-1.14l.82-3.24a.54.54 0 0 0 .01-.12 1 1 0 1 0-.8-.4.54.54 0 0 0-.1.09c-.49.62-1 .87-1.54.81-.5-.05-1.04-.74-1.57-2.13a1 1 0 1 0-.98 0zM11 11.75a.5.5 0 1 1 0 1H5a.5.5 0 1 1 0-1h6z"
              ></path>
            </svg>
            <p>Try to Premium</p>
          </div>
        )}
        <div className="cursor-pointer w-[230px] p-2 mb-4 hover:bg-gray-100 rounded-lg flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <p>Home</p>
        </div>
        <div
          onClick={() => {
            setShowCategoryList(!showCategoryList);
          }}
          className="cursor-pointer w-[230px] p-2 mb-4 hover:bg-gray-100 rounded-lg flex items-center gap-4"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.333 4H6.667A2.667 2.667 0 0 0 4 6.667v18.666A2.667 2.667 0 0 0 6.667 28h18.666A2.667 2.667 0 0 0 28 25.333V6.667A2.667 2.667 0 0 0 25.333 4ZM6 6.667C6 6.298 6.298 6 6.667 6h10.666v20H6.667A.667.667 0 0 1 6 25.333V6.667Zm13.333 6.666V6h6c.369 0 .667.298.667.667v6.666h-6.667Zm0 2V26h6a.667.667 0 0 0 .667-.667v-10h-6.667Z"
              fill="currentColor"
            ></path>
          </svg>
          <p className="flex-1">Template</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m8.55 5.78 5.96 5.97c.1.1.1.25 0 .35l-5.87 5.87a.75.75 0 0 0 1.06 1.06l5.87-5.87c.69-.68.69-1.79 0-2.47L9.61 4.72a.75.75 0 0 0-1.06 1.06z"
            ></path>
          </svg>
        </div>
        {showCategoryList &&
          categoryList.map((category, index) => {
            return (
              <div
                className="cursor-pointer w-full p-2 pl-14 mb-4 hover:bg-gray-100 rounded-lg flex items-center gap-4"
                key={index}
              >
                <p className="flex-1">{category}</p>
              </div>
            );
          })}
        <div className="cursor-pointer w-full p-2 mb-4 hover:bg-gray-100 rounded-lg flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
            />
          </svg>

          <p>My Blog</p>
        </div>
        <div className="cursor-pointer w-full p-2 mb-4 hover:bg-gray-100 rounded-lg flex items-center gap-4">
          <svg
            className="w-6 h-6"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.078 5.333H5.334A2.667 2.667 0 0 0 2.667 8v2.667c0 .203.023.402.066.592a2.315 2.315 0 0 0-.066.55v12.382c0 1.367 1.194 2.476 2.667 2.476h21.333c1.473 0 2.667-1.109 2.667-2.477V11.81c0-1.368-1.194-2.477-2.667-2.477h-9.333l-.726-2.176a2.667 2.667 0 0 0-2.53-1.824Zm-8.744 4h9.892L14.71 7.79a.667.667 0 0 0-.633-.456H5.334A.667.667 0 0 0 4.667 8v1.411c.213-.05.436-.078.667-.078Zm-.667 2.477c0-.229.267-.477.667-.477h21.333c.4 0 .667.248.667.477v12.38c0 .229-.267.477-.667.477H5.334c-.4 0-.667-.248-.667-.477V11.81Z"
              fill="currentColor"
            ></path>
          </svg>

          <p>My Product</p>
        </div>
      </div>

      {/* <div className="">
        <div className="cursor-pointer w-full p-2 mb-4 hover:bg-gray-100 rounded-lg flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <p>Logout</p>
        </div>
      </div> */}
      <ServicePackage
        showServiePackages={showServiePackages}
        setShowServiePackages={setShowServiePackages}
        user={user}
       setIsPremium={setIsPremium}
      />
    </aside>
  );
}

export default AdminSidebar;
