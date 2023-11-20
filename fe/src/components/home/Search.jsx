import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  const handleSearch = () => { };
  const handleView = async (id) => {
    try {
      const templateChoosed = await axios.get("https://localhost:", {
        params: { id },
      });
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    const getSearch = async () => {
      try {
        if (searchValue) {
          const result = await axios.get(`http://localhost:5000/api/v1/template/search-template/${searchValue}`, {
            // params: {
            //   search: searchValue,
            // },
          });
          console.log(result)
          setSearchResult(result.data.templates);
        }
      } catch (error) {
        return;
      }
    };

    const timer = setTimeout(() => {
      getSearch();
    }, 700);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="search flex justify-center items-center justify-items-center w-full">
      <Tippy
        interactive={true}
        visible={showResult && searchResult?.length > 0}
        offset={[0, 5]}
        placement="bottom"
        render={({ ...attrs }) => (
          <div
            tabIndex="-1"
            {...attrs}
            className="w-[500px]  inline-block rounded-[3px] shadow-md"
          >
            {searchResult?.map((template) => (
              <div
                className="flex justify-start px-4 text-[20px] boder-neutral-700 cursor-pointer hover:bg-gray-100  bg-white  py-1"
                key={template.id}
              // onClick={() => handleView(template.id)}
              >
                <Link to={`/design/preview/${template.id}`}> {template.name}</Link>
              </div>
            ))}
          </div>
        )}
      >
        <div className="flex relative w-[500px] h-12 border-neutral-100 focus-within:border-neutral-300 rounded-[5px] justify-end">
          <input
            className="w-full h-full rounded-full text-xl text-black placeholder:text-[#555] pl-8 outline-none border-none"
            type="text"
            value={searchValue}
            spellCheck={false}
            ref={inputRef}
            placeholder="Catalogue"
            onChange={handleChange}
          />
          {/* <div className="absolute w-[2px] h-10  top-[8px] bg-[#ccc] ml-[500px] "></div> */}
          <button
            className=" text-2xl rounded-full h-full w-12 flex items-center justify-center
            bg-[#ffe72f] hover:bg-[#ffec5f] text-black  absolute  shadow-2xl"
            onClick={() => handleSearch}
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
      </Tippy>
    </div>
  );
}

export default Search;
