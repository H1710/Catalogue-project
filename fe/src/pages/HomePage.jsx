import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTemplateRoute } from '../utils/APIRoute';
import axios from 'axios';


import Search from '../components/Search';
import Slider from '../components/homepage/Slider';
import Footer from '../components/Footer';
import { templateList } from '../shared/Template';
import MyProduct from '../components/homepage/MyProduct';

const HomePage = () => {
  // const showSidebar = useContext(ShowSidebarContext)
  const [input, setInput] = useState('');
  // const [templateList, setTemplateList] = useState("");
  // const [templateNumber, setTemplateNumber] = useState(0);
  const [template, setTemplate] = useState('');
  // useEffect(() => {
  //   const handleAPI = async () => {
  //     const res = await axios.get(`${getTemplateRoute}/1`);
  //     setTemplateList(res.data.data);
  //   };
  //   handleAPI();
  // }, []);
  const handleSubmit = () => {
    console.log(input);
  };
  
  return (
    <div >
      <div className="h-[250px] pt-4 pl-4 pr-8 pb-0 ">
        <div className="rounded-[5px] w-full h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center items-center justify-items-center">
          <Search />
        </div>
      </div>

      <div className=" pl-4">
        
        <div className="pt-6 pr-8 pb-12 pl-4">
          <Slider templateList={templateList} />
        </div>
        <div>
          <MyProduct myProduct={templateList} />
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
