import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

function Footer() {
  return (
    <footer className="">
      <div className='flex'>
        <FontAwesomeIcon icon={faCopyright} />
        <p> Copyright 2023 Noto Group</p>
      </div>
    </footer>
  );
}

export default Footer;
