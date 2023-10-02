import React from "react";

const CreateForm = ({ blog, setBlog }) => {
  //   const { categories } = useSelector((state) => state);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleChangeThumbnail = (e) => {
    const target = e.target;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: file });
    }
  };

  return (
    <form className="flex-1">
      <div className="relative flex">
        <input
          type="text"
          className="w-full"
          value={blog.title}
          name="title"
          onChange={handleChangeInput}
        />

        <small
          className="absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.title.length}/50
        </small>
      </div>

      <div className="my-3">
        <input
          type="file"
          className="w-full border border-black"
          accept="image/*"
          onChange={handleChangeThumbnail}
        />
      </div>

      <div className="relative flex">
        <textarea
          className="w-full"
          rows={4}
          value={blog.description}
          style={{ resize: "none" }}
          name="description"
          onChange={handleChangeInput}
        />

        <small
          className="absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.description.length}/200
        </small>
      </div>
    </form>
  );
};

export default CreateForm;
