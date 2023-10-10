import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <Button
         to={item.to}
         icon={item.icon}
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        >
          {item}
        </Button>
      );
    });
  };

  return (
    <Tippy
    offset={[0, 5]}
      interactive
      placement='bottom-end'
      delay={[0, 700]}
      hideOnClick={false}
      render={(attrs) => (
        <div tabIndex={-1} {...attrs}
        className='bg-[#fafaf9] min-w-[200px] text-base cursor-pointer rounded-md'
         
        >
          {history.length > 1 && 
          <Button icon={<FontAwesomeIcon icon={faChevronLeft}/> }
          onClick={()=> {
            setHistory(prev => prev.slice(0, prev.length - 1))
          }}
          >
            {'Language'}
          </Button>}
          {renderItems()}
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
