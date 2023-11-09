import React, { useState } from "react";
import Tag from "../Tag";

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

  const handleChangeTag = (e) => {
    const string = e.target.value;
    const tags = string.split(" ");
    setBlog({ ...blog, tags: tags });
  };

  return (
    <form className=" flex flex-col flex-1 gap-2">
      <div className="relative flex h-[40px] border border-[--border-input] rounded">
        <input
          type="text"
          className="w-full rounded py-1 px-2 outline-none text-sm"
          value={blog.title}
          placeholder="Title"
          name="title"
          onChange={handleChangeInput}
          required
        />

        <small
          className="absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.title.length}/50
        </small>
      </div>

      <div className="relative overflow-hidden items-center flex w-full h-[40px] border border-[--border-input] rounded gap-2">
        <input
          type="text"
          className="border-none outline-none flex-1 py-1 px-2 text-sm"
          placeholder="Tag"
          // value={blog.tag[blog.tag.length - 1]}
          name="tag"
          onChange={handleChangeTag}
          required
        />
      </div>

      <div className="">
        <input
          type="file"
          className="w-full border border-[--border-input] rounded py-1 px-2 outline-none text-sm"
          accept="image/*"
          onChange={handleChangeThumbnail}
          required
        />
      </div>

      <div className="relative flex flex-1 border border-[--border-input] rounded">
        <textarea
          className="w-full rounded py-1 px-2 outline-none text-sm"
          rows={4}
          value={blog.description}
          placeholder="Description"
          style={{ resize: "none" }}
          name="description"
          onChange={handleChangeInput}
          required
        />

        <small
          className="absolute"
          style={{ bottom: 0, right: "3px", opacity: "0.3" }}
        >
          {blog.description.length}/300
        </small>
      </div>
    </form>
  );
};

export default CreateForm;
