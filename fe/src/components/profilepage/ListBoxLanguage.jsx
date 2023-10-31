import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox } from '@headlessui/react';
import React, { useState } from 'react';

export default function ListBoxLanguage({ languages, info, setInfo }) {
  const [language, setLanguage] = useState(info.language);
  const handleLanguageChange = (languageSelected) => {
    console.log(languageSelected)
    setLanguage(languageSelected);
    setInfo({ ...info, language: languageSelected });
  };
  return (
    <div className="flex flex-col w-72">
      <div className="font-semibold ">Language</div>
      <Listbox value={language} onChange={handleLanguageChange}>
        <div className=" relative mt-1">
          <Listbox.Button className="relative  w-72 border-2 border-slate-100 rounded cursor-default bg-white py-2 pl-3 pr-10 text-left shadow-md">
            <span className="block truncate">{language}</span>
            <span className='"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <FontAwesomeIcon icon={faChevronDown} className="font-semibold" />
            </span>
          </Listbox.Button>
          <Listbox.Options>
            {languages.map((language) => (
              <Listbox.Option
                key={language.id}
                value={language.name}
                className={({ active }) =>
                  `relative select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-emerald-100 text-emerald-900' : 'text-gray-900'
                  } `
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {language.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
