import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/common/Header';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import {  useState } from 'react';
import InfoDetail from '../components/profile/InfoDetail';
import ChangeAvatar from '../components/profile/ChangeAvatar';
import ListBoxLanguage from '../components/profile/ListBoxLanguage';
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

 
  return (
    <>
      
              <div className="flex grid col-span-full ml-3 mt-4 text-center h-10 items-center justify-center rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400  w-[200px] font-semibold">
                <span className='px-2 text-left'>Profile</span>
              </div>
              
                <div className="grid gap-4">
                  <ChangeAvatar info={info} setInfo={setInfo} />
                  <InfoDetail info={info} setInfo={setInfo} name="name" label="Name" />
                  <InfoDetail info={info} setInfo={setInfo} name="address" label="Address" />
                  <InfoDetail info={info} setInfo={setInfo} name="email" label="Email" />
                  <InfoDetail info={info} setInfo={setInfo} name="password" label="Password" />
                  <ListBoxLanguage
                    languages={languages}
                    info={info}
                    setInfo={setInfo}
                  />
                </div>
    </>
            
          
        
     
    
  );
}

export default ProfilePage;