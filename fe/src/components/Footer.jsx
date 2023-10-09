import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

function Footer() {
  return (
    <footer className="h-10 w-full shadow-md border-t-2 border-slate-300">
     
      <div className='flex items-center justify-center pt-2'>
        <FontAwesomeIcon icon={faCopyright} />
        <p className='pl-2'> Copyright 2023 Noto Group</p>
      </div>
    </footer>
  );
}

export default Footer;
