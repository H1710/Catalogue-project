// button like Logout, view profile

import { Link } from "react-router-dom";
function Button({
  to,
  href,
  icon,
  className,
  disabled,
  children,
  onClick,
  title,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] !== 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = Link
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  
  return (
   <div className="p-1 min-w-full flex rounded-[5px] min-h-[40px]  " {...props}>
      <Comp className='hover:bg-green-100 min-w-full rounded-[5px] flex justify-start items-center'  >
        {icon && <span className="px-2">{icon}</span>}
        <span className="px-2">{children.title || children}</span>
      </Comp>
   </div>
  );
}

export default Button;
