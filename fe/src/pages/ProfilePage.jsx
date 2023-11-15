import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/common/Header';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import {  useState } from 'react';
import InfoDetail from '../components/profile/InfoDetail';
import ChangeAvatar from '../components/profile/ChangeAvatar';
import ListBoxLanguage from '../components/profile/ListBoxLanguage';
import { Disclosure } from '@headlessui/react';
import { useOutletContext } from 'react-router-dom';

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

 console.log(user);
 
  return (
    <div className='flex flex-row grid col-span-full md:w-[500px] sm:w-[300px]'>
      
              <div className="  ml-3 mt-4 text-center h-10  rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400  w-[200px] font-semibold">
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
                </div>
    </div>
            
          
        
     
    
  );
}

export default ProfilePage;