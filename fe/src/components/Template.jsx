import React, { useEffect, useState } from "react";
import ChangeAvatarForm from "./ChangeAvatarForm";

const Template = ({ template, setTemplate }) => {
  const [image, setImage] = useState("");
  const [openEditAvatar, setOpenEditAvatar] = useState(false);
  const [details, setDetails] = useState(
    template.template_pages[0].template_page_details
  );

  useEffect(() => {
    setDetails(template.template_pages[0].template_page_details);
  }, [template]);
  console.log(details);
  const [page, setPage] = useState(0);

  const handleChange = (e, index) => {
    let newData = details;
    newData[index].defaultContent = e.target.value;
    console.log(e.target.value);
    setDetails([...newData]);
  };

  return (
    <div className={template.styleGeneric}>
      {template &&
        details.map((pageDetail, index) =>
          pageDetail.textInput ? (
            pageDetail.isOneLine ? (
              <div className={pageDetail.containerStyle} key={index}>
                <input
                  key={index}
                  maxLength={pageDetail.maxLength}
                  className={pageDetail.inputStyle}
                  value={pageDetail.defaultContent}
                  onChange={(e) => handleChange(e, index)}
                ></input>
              </div>
            ) : (
              <div className={pageDetail.containerStyle} key={index}>
                <textarea
                  className={pageDetail.inputStyle}
                  maxLength={pageDetail.maxLength}
                  value={pageDetail.defaultContent}
                  onChange={(e) => handleChange(e, index)}
                ></textarea>
              </div>
            )
          ) : (
            <div
              key={index}
              className={pageDetail.containerStyle}
              onClick={(e) => {
                setOpenEditAvatar(true);
              }}
            >
              {image && (
                <img src={image} alt="" className={pageDetail.imageStyle} />
              )}
            </div>
          )
        )}

      <ChangeAvatarForm
        openEditAvatar={openEditAvatar}
        setOpenEditAvatar={setOpenEditAvatar}
        setImage={setImage}
      />
    </div>
  );
};

export default Template;
