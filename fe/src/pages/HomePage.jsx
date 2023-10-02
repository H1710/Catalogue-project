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
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import Footer from '../components/Footer';

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
    <div
      className=" h-[1500px] "
      style={
        {
          // backgroundImage: `url(${background})`
        }
      }
    >
      <Header />
      <div className="  h-[250px]  pl-4 box-border  ">
        <div
          className=" relative  w-full h-full pt-6 pl-4 pr-8 pb-0 flex justify-center items-center justify-items-center" >
          <div className=" rounded-[5px]  w-full h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
          <Search />
        </div>
      </div>
      <div className="pl-4">
        <div className='pt-6 pr-8 pb-12 pl-4'>
          <h2 className="content text-3xl flex justify-start p-4">
            Most popular catalogue
          </h2>
          <Slider />
        </div>
      </div>

      {template && <Template template={template} setTemplate={setTemplate} />}

      <Footer />
    </div>
  );
};

export default HomePage;
