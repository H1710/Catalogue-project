import React from 'react';
import PreviewBlog from '../components/blog/PreviewBlog';
import UserStats from '../components/staticpage/UserStats';
import RevenueStats from '../components/staticpage/RevenueStats';

 
 
const StatiticsPage = () => {
  return (
   <div className='flex flex-col col-span-full items-center  '>
      <div className='h-10 px-4 text-[20px]  font-bold '>
        Dashboard
      </div>
      <div className='justify-center items-center'>
        <span className='text-[18px]   font-semibold   bg-emerald-200  px-2 ring-1 ml-4'>User Stats</span>
      <UserStats/>
      <span className='text-[18px]   font-semibold   bg-emerald-200  px-2 ring-1 ml-4'>Revenue stats</span>
      <RevenueStats/>
      </div>
   </div>
  );
};

export default StatiticsPage;
