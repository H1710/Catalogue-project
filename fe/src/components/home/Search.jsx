import React, { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Search() {
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    navigate(`/template?search=${inputRef.current.value}`);
  }, []);

  return (
    <div className="search flex justify-center items-center justify-items-center w-full">
      <div className="flex relative w-[500px] h-12 border-neutral-100 focus-within:border-neutral-300 rounded-[5px] justify-end">
        <input
          className="w-full h-full rounded-full text-xl text-black placeholder:text-[#555] pl-8 outline-none border-none"
          type="text"
          // value={searchValue}
          spellCheck={false}
          ref={inputRef}
          placeholder="Catalogue"
          // onChange={handleChange}
        />
        {/* <div className="absolute w-[2px] h-10  top-[8px] bg-[#ccc] ml-[500px] "></div> */}
        <button
          className=" text-2xl rounded-full h-full w-12 flex items-center justify-center
            bg-[#ffe72f] hover:bg-[#ffec5f] text-black  absolute  shadow-2xl"
          onClick={handleSearch}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.928 1.048c.013-.064.13-.064.144 0 .115.543.38 1.51.875 2.005.495.496 1.462.76 2.006.875.063.013.063.13 0 .144-.544.115-1.51.38-2.006.875-.496.495-.76 1.462-.875 2.005-.013.064-.13.064-.144 0-.115-.543-.38-1.51-.875-2.005-.495-.496-1.462-.76-2.006-.875-.063-.013-.063-.13 0-.144.544-.115 1.51-.38 2.006-.875.496-.495.76-1.462.875-2.005ZM13.067 4.046c-.012-.061-.122-.061-.134 0-.133.67-.477 2.044-1.16 2.727-.683.683-2.057 1.027-2.727 1.16-.061.012-.061.122 0 .134.67.133 2.044.477 2.727 1.16.683.683 1.027 2.057 1.16 2.727.012.061.122.061.134 0 .133-.67.477-2.044 1.16-2.727.683-.683 2.057-1.027 2.727-1.16.061-.012.061-.122 0-.134-.67-.133-2.044-.477-2.727-1.16-.683-.683-1.027-2.057-1.16-2.727Z"
              fill="currentColor"
            ></path>
            <path
              d="M2 11.5a7.5 7.5 0 0 0 12.202 5.843l4.156 4.157a1 1 0 1 0 1.415-1.414l-4.193-4.193A7.46 7.46 0 0 0 16.984 12h-1.505A6 6 0 1 1 9 5.52V4.017A7.5 7.5 0 0 0 2 11.5Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Search;
