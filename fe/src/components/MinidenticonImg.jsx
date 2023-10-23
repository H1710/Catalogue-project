import { minidenticon } from "minidenticons";
import { useMemo } from "react";

const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );
  return <img src={svgURI} alt={username} {...props} className="w-10 h-10" />;
};

export default MinidenticonImg;
