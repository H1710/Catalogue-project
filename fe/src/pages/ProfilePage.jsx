import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/common/Header';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import InfoDetail from '../components/profile/InfoDetail';
import ChangeAvatar from '../components/profile/ChangeAvatar';
import ListBoxLanguage from '../components/profile/ListBoxLanguage';
import { Disclosure } from '@headlessui/react';
import { useOutletContext } from 'react-router-dom';
// import { use } from '../../../be/src/routes/template';
import axios from 'axios';

const languages = [
  {
    id: 1,
    name: 'English',
  },
  {
    id: 2,
    name: 'Vietnamese',
  },
];
function ProfilePage() {
  const [user, setOpenAuthForm] = useOutletContext();
  const [info, setInfo] = useState(user);
  const [data, setData] = useState([]);

  useEffect(() => {
    const callAPI = () => {
      const res = axios.get(`http://localhost:5000/api/v1/get-historical-order/${user.id}`)
      console.log(res.orders)
      setData(res.orders)
    }

  }, [user])

  console.log(user?.orders);

  return (
    <div className='flex flex-row grid col-span-full  '>

      {/* <div className="  ml-3 mt-4 text-center h-10  rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400  w-[200px] font-semibold">
        Profile
      </div>

      <div className=" grid gap-4">
        <ChangeAvatar info={info} setInfo={setInfo} />
        <InfoDetail info={info} setInfo={setInfo} name="name" label="Name" />
        <InfoDetail info={info} setInfo={setInfo} name="country" label="Country" />
        <InfoDetail info={info} setInfo={setInfo} name="email" label="Email" />
        <InfoDetail info={info} setInfo={setInfo} name="password" label="Password" />
        <ListBoxLanguage
          languages={languages}
          info={info}
          setInfo={setInfo}
        />
      </div> */}
      <div className="  ml-3 mt-4 text-center h-10  rounded-md mb-4 text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400  w-[200px] font-semibold">
        Orders

      </div>
      <table className='p-2 table-auto border-collapse border border-slate-400 '>
        <thead>
          <tr>
            <td className='border border-slate-300 py-2 px-6'>
              No.
            </td>
            <td className='border border-slate-300 py-2 px-6'>
              CreatedAt
            </td>
            <td className='border border-slate-300 py-2 px-6'>
              Name
            </td>
            <td className='border border-slate-300 py-2 px-6'>
              Remain day
            </td>
          </tr>
        </thead>
        <tbody>
          {
            user?.orders.map((order, index) => (
              <tr>
                <td className='border border-slate-300 py-2 px-6'>{index + 1}</td>
                <td className='border border-slate-300 py-2 px-6'>{order.createdAt.slice(0, 10)}</td>
                <td className='border border-slate-300 py-2 px-6'>{order.service_package.name}</td>
                <td className='border border-slate-300 py-2 px-6'>{order.service_package.remain_day}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>





  );
}

export default ProfilePage;