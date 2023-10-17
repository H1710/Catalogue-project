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
    <div className=" flex py-1 justify-center  " {...props}>
      <Comp className='p-2 rounded-[5px] w-[150px] hover:bg-green-50 justify-start flex' >
        {icon && <span className="px-1 ">{icon}</span>}
        <span className="px-2">{children.title || children}</span>
      </Comp>
    </div>
  );
}

export default Button;
