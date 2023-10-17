import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
  return (
    <div className="px-4  col-span-2 ">
      <div className="text-xl font-semibold  ">Your Profile</div>
      <div className="grid gap-4">
        <div className="border-b-2 border-slate-50  pb-4">
          <div className="avatar flex items-center  py-2 relative">
            <img
              src="https://demoda.vn/wp-content/uploads/2023/01/hinh-anh-avatar-cute-1-600x600.jpg"
              alt=""
              className="w-16 h-16 rounded-[50%]"
            />
            <div className="flex flex-col pl-5">
              <div className="  min-w-[240px] text-[18px]">
                Upload your profile photo
              </div>
              <div className="min-w-[250px] text-[16px] italic">
                This setting helps team members recognize you on Noto.
              </div>
            </div>
            <div className="flex justify-center items-center absolute right-0 ">
              <input
                type="file"
                aria-hidden="true"
                className="set-avatar hidden"
                id="set-avatar"
              />
              <label
                htmlFor="set-avatar"
                className=" update-btn bg-slate-50 rounded-[5px]  flex justify-center items-center w-[150px] h-10 justify-center items-center flex justify-end cursor-pointer "
              >
                <p>Upload your photo</p>
              </label>
            </div>
          </div>
        </div>

        <div className="profile-details pb-4 border-b-2 border-slate-50">
          <div className="flex  flex-col justify-start  h-[72px]   w-full relative">
            <div className="font-semibold h-8 pb-2"> Name</div>
           <div className='flex justify-between'>
              <div className=""> Hieu</div>
              <div className="btn bg-slate-50 cursor-pointer  flex justify-center items-center rouned-[5px] w-[150px]  h-10 "
              // onClick={() => handleChangeProfile}
              >
                Fix
              </div>
           </div>
          </div>
        </div>
        <div className="profile-details pb-4 border-b-2 border-slate-50">
          <div className="flex  flex-col justify-start  h-[72px]   w-full relative">
            <div className="font-semibold h-8 pb-2"> Email</div>
            <div className='flex justify-between'>
              <div className=""> Hieuttse172576@fpt.edu,vn</div>
              <div className="btn bg-slate-50 cursor-pointer  flex justify-center items-center rouned-[5px] w-[150px]  h-10 "
              >
                Fix
              </div>
           </div>
          </div>
        </div>
        <div className="profile-details pb-4 border-b-2 border-slate-50">
          <div className="flex  flex-col justify-start  h-[72px]   w-full relative">
            <div className="font-semibold h-8 pb-2"> Password</div>
            <div className='flex justify-between'>
              <div className=""> ********</div>
              <div className="btn bg-slate-50 cursor-pointer  flex justify-center items-center rouned-[5px] w-[150px]  h-10 "
              >
                Fix
              </div>
           </div>
          </div>
        </div>

        <div className="flex  flex-col grid gap-0.5  border-b-2 border-slate-50 w-full relative ">
          <div className="font-semibold "> Language</div>
          <div>
            <select className="w-[200px]">
              <option>English</option>
              <option>VietNamese</option>
            </select>
          </div>
          <div className="btn bg-slate-50 cursor-pointer flex items-center justify-center rouned-[5px] w-[150px] h-10 absolute right-0">
            Fix
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
