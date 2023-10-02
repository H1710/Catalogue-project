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
   <div className="search  flex justify-center items-center justify-items-center   w-full  absolute  ">
      <Tippy
        interactive={true}
        visible={showResult && searchResult.length > 0}
        offset={[0, 5]}
        placement="bottom"
        render={({...attrs}) => (
          <div
            tabIndex="-1"
            {...attrs}
            className="w-[500px] bg-[#f9fafb] inline-block rounded-[3px]"
          >
           
            {searchResult.map((template) => (
              <div
                className="flex justify-start px-4 text-xl boder-neutral-700 cursor-pointer hover:bg-zinc-100 py-1"
                key={template.id}
                onClick={()=>handleView(template.id)}
              >
                {template.name}
              </div>
            ))}
          </div>
        )}
      >
        <div className="flex group relative h-14 bg-zinc-100 border-neutral-100 focus-within:border-neutral-300 rounded-full">
          <input
            className="w-[500px]  bg-zinc-100 rounded-l-full h-14 text-xl px-6 outline-none border-none"
            type="text"
            value={searchValue}
            spellCheck={false}
            ref={inputRef}
            placeholder="Search template name..."
            onChange={handleChange}
          />
          <div className="absolute w-[2px] h-10  top-[8px] bg-[#ccc] ml-[500px] "></div>
          <button
            className=" text-3xl rounded-r-full h-14 w-14 flex items-center justify-center
            border-neutral-100 hover:bg-neutral-200 text-zinc-400 hover:text-zinc-700   "
            onClick={()=> handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className=" " />
          </button>
        </div>
      </Tippy>
   </div>
  );
}

export default Search;
