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
    <Comp className='p-2 bg-[#fafaf9] min-w-full flex rounded-md hover:bg-[#e2e8f0] ' {...props}>
      {icon && <span className="">{icon}</span>}
      <span className="px-3">{children.title || children}</span>
    </Comp>
  );
}

export default Button;
