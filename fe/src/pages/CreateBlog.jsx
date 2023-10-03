import React, { useEffect, useRef, useState } from "react";
import CreateForm from "../components/blog/CreateBlogForm";
import PreviewBlog from "../components/blog/PreviewBlog";
import QuillEditor from "../components/textEditor/QuillEditor";
import axios from "axios";
import { createBlogRoute } from "../utils/APIRoute";

const CreateBlog = () => {
  const initState = {
    user: 1,
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    createdAt: new Date().toISOString(),
  };

  const [blog, setBlog] = useState(initState);
  const [body, setBody] = useState("");

  const divRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const text = div?.innerText;
    setText(text);
  }, [body]);

  const handleCreateBlog = async () => {
    const newData = { ...blog, content: body };
    console.log(newData);
    let formData = new FormData();
    for (let key in newData) {
      formData.append(key, newData[key]);
    }
    const data = await axios.post(createBlogRoute, formData);
  };

  return (
    <div className="my-4 w-full px-4">
      <div className="grid grid-cols-5 my-4 gap-4 w-full h-[310px]">
        <div className="col-start-1 col-span-2 flex flex-col">
          <p className="text-2xl mb-2 font-semibold">Create</p>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>

        <div className="col-start-3 col-span-3 flex flex-col">
          <p className="text-2xl mb-2 font-semibold">Preview</p>
          <PreviewBlog blog={blog} />
        </div>
      </div>
      <QuillEditor setBody={setBody} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      {/* <small>{text.length}</small> */}

      <div
        className="w-full flex justify-center mt-4"
        onClick={() => handleCreateBlog()}
      >
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
