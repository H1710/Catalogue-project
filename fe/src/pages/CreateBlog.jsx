import React, { useEffect, useRef, useState } from "react";
import CreateForm from "../components/blog/CreateBlogForm";
import PreviewBlog from "../components/blog/PreviewBlog";
import QuillEditor from "../components/textEditor/QuillEditor";
import axios from "axios";
import { createBlogRoute } from "../utils/APIRoute";
import { useMutation } from "react-query";
import { postAPI } from "../utils/FetchData";
import { useLocation, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state?.user) {
      navigate("/");
    }
  }, [state, navigate]);

  const { user } = state;
  console.log(user);
  const initState = {
    userId: user.id,
    title: "",
    content: "",
    description: "",
    thumbnail: undefined,
    tags: [],
    createdAt: new Date().toISOString(),
  };

  const [blog, setBlog] = useState(initState);
  const [body, setBody] = useState("");

  const divRef = useRef(null);

  const { mutate, isLoading: loadingLogin } = useMutation({
    mutationFn: (info) => {
      return postAPI(createBlogRoute, info);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      console.log(data);
      // dispatch(seft({ ...data.data.user }));
      // setOpenForm(false);
      // toast.success(data.data.message, toastOptions);
      // localStorage.setItem("signed", "chat-app");
      // navigate("/");
    },
  });

  const handleCreateBlog = async () => {
    const newData = { ...blog, content: body };
    console.log(newData);
    let formData = new FormData();
    for (let key in newData) {
      formData.append(key, newData[key]);
    }
    console.log(formData);
    mutate(formData);
  };

  return (
    <div className="col-span-full px-4 h-full mb-4">
      <div className="grid grid-cols-5 lg:grid-cols-5 gap-4 w-full mb-4">
        <div className="col-start-1 col-span-5 xl:col-span-2 flex flex-col">
          <p className="text-xl mb-2 font-semibold">Create</p>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>

        <div className="col-start-1 col-span-5 xl:col-start-3 xl:col-span-3 flex flex-col xl:ml-4">
          <p className="text-xl pl-4 mb-2 font-semibold">Preview</p>
          <div className="">
            <PreviewBlog blog={blog} author={user.name} />
          </div>
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
