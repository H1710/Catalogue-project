import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';
import InfoDetail from '../components/profilepage/InfoDetail';
import ChangeAvatar from '../components/profilepage/ChangeAvatar';
import ListBoxLanguage from '../components/profilepage/ListBoxLanguage';
import { Disclosure } from '@headlessui/react';

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
  const initInfo = {
    avatar:
      'https://demoda.vn/wp-content/uploads/2023/01/hinh-anh-avatar-cute-1-600x600.jpg',
    email: 'email@example',
    name: 'example',
    password: 'password',
    address: 'HCM City',
    language: 'English',
  };
  const [info, setInfo] = useState(initInfo);

  console.log('rerendering');

  return (
    <div className="px-4  col-span-2 grid gap-y-4 ">
      <Disclosure >
        {({ open }) => (
          <>
            <Disclosure.Button className="text-[18px] w-[300px] border-2 border-slate-300 rounded  flex   items-center bg-slate-50 hover:bg-emerald-300 shadow">
              <span className='px-2 text-left'>Profile</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-emerald-900 p-4`}
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className="grid gap-4">
                <ChangeAvatar info={info} setInfo={setInfo} />
                <InfoDetail info={info} setInfo={setInfo} name="Name" />
                <InfoDetail info={info} setInfo={setInfo} name="Address" />
                <InfoDetail info={info} setInfo={setInfo} name="Email" />
                <InfoDetail info={info} setInfo={setInfo} name="Password" />
                <ListBoxLanguage
                  languages={languages}
                  info={info}
                  setInfo={setInfo}
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({open})=> (
          <>
          <Disclosure.Button className="text-[18px] w-[300px] border-2 border-slate-300 rounded  flex   items-center bg-slate-50 hover:bg-emerald-300 shadow">
            <span className='px-2'>Historical Orders</span>
            <FontAwesomeIcongit 
                icon={faChevronDown}
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-emerald-900 p-4`}
              />
          </Disclosure.Button>
          <Disclosure.Panel>
            
          </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {/* <div className="text-xl font-semibold  ">Your Profile</div> */}
    </div>
  );
}

export default ProfilePage;
