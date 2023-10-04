import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTemplateRoute } from "../utils/APIRoute";
import axios from "axios";
import Template from "../components/Template";
import Header from "../components/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// import background from 'assets/images/background.png';
import Search from "../components/Search";
import Banner from "../components/Banner";
import Slider from "../components/Slider";

const HomePage = () => {
  const [input, setInput] = useState("");
  // const [templateList, setTemplateList] = useState("");
  // const [templateNumber, setTemplateNumber] = useState(0);
  const [template, setTemplate] = useState("");
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
      <div className="relative h-[500px] shadow-md flex justify-center items-center justify-items-center">
        <Banner />
        <Search />
      </div>
      <div className=" ">
        <h2 className="content text-3xl flex justify-start p-4">
          Most popular catalogue
        </h2>
        <Slider />
      </div>

      {template && <Template template={template} setTemplate={setTemplate} />}
    </div>
  );
};

export default HomePage;
