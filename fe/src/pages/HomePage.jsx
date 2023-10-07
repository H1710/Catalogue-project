import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTemplateRoute } from '../utils/APIRoute';
import axios from 'axios';
import Template from '../components/Template';
import Header from '../components/Header';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// import background from 'assets/images/background.png';
import Search from '../components/Search';
import Banner from '../components/homepage/Banner';
import Slider from '../components/homepage/Slider';
import Footer from '../components/Footer';
import Sidebar from '../components/homepage/Sidebar';
import {templateList} from '../shared/Template'
const HomePage = () => {
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
    <div className="theme relative" >
      {/* <div className="col-start-1 col-end-3 row-start-1 row-end-2 w-full sticky absolute block" >
        <Header show={showSidebar}/>
      </div>
      <div className="col-start-1 col-end-2 row-start-2 row-end-5 pl-4">
       {showSidebar && <Sidebar />}
      </div> */}

      <div className="col-start-2 col-end-3 row-start-2 row-end-3 h-[250px] pt-4 pl-4 pr-8 pb-0 block z-40 ">
        <div className=" rounded-[5px] w-full h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center items-center justify-items-center">
        <Search />
        </div>
         
      </div>

      <div className="col-start-2 col-end-3 row-start-3 row-end-4  pl-4">
        <div className="pt-6 pr-8 pb-12 pl-4">
          <h2 className="content text-[18px] flex justify-start pb-2">
            Most popular catalogue
          </h2>
          <Slider templateList={templateList} />
        </div>
      </div>


     <div className='col-start-2 col-end-3 row-start-4 row-end-5'> <Footer /></div>
    </div>
  );
};

export default HomePage;
