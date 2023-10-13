import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };
  const handleSearch = () => {};
  const handleView = async(id) => {
     try {
      const templateChoosed = await axios.get(
        'https://localhost:', {
          params: {id}
        }
      )
     }catch (error) {
      return;
     }

  }
  useEffect(() => {
    const getSearch = async () => {
      try {
        if (searchValue) {
          const result = await axios.get('http://localhost:3000', {
            params: {
              search: searchValue,
            },
          });
          setSearchResult(result.data.data);
        }
      } catch (error) {
        return ;
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
        render={({...attrs}) => (
          <div
            tabIndex="-1"
            {...attrs}
            className="w-[500px]  inline-block rounded-[3px] shadow-md"
          >
           
            {searchResult.map((template) => (
              <div
                className="flex justify-start px-4 text-[20px] boder-neutral-700 cursor-pointer hover:bg-white  py-1"
                key={template.id}
                onClick={()=>handleView(template.id)}
              >
                {template.name}
              </div>
            ))}
          </div>
        )}
      >
        <div className="flex relative h-14 border-neutral-100 focus-within:border-neutral-300 rounded-[5px] justify-end">
          <input
            className="w-[500px] shadow-2xl rounded-full h-16 text-xl pl-8 outline-none border-none"
            type="text"
            value={searchValue}
            spellCheck={false}
            ref={inputRef}
            placeholder="Catalogue ..."
            onChange={handleChange}
          />
          {/* <div className="absolute w-[2px] h-10  top-[8px] bg-[#ccc] ml-[500px] "></div> */}
          <button
            className=" text-2xl rounded-full h-16 w-16 flex items-center justify-center
            bg-teal-900 hover:bg-teal-950 text-zinc-400 hover:text-zinc-700  absolute r-0 shadow-2xl"
            onClick={()=> handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
          </button>
        </div>
      </Tippy>
   </div>
  );
}

export default Search;
