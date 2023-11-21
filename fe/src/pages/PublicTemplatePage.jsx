import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import * as Yup from "yup";
import Tag from "../components/Tag";
import { useMutation } from "react-query";
import { createBlogRoute, createTemplateRoute } from "../utils/APIRoute";
import { postAPI } from "../utils/FetchData";
import CustomButton from "../components/common/Button";
import { toast } from "react-toastify";

const PublicTemplate = () => {
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [user] = useOutletContext();

  const { mutate: publicTemplate, isLoading: loadingPublicTemplate } =
    useMutation({
      mutationFn: (info) => {
        return postAPI(createTemplateRoute, info);
      },
      onError: (error) => {
        // toast.error(error.response.data.message, toastOptions);
      },
      onSuccess: (data) => {
        toast.success("Public success.Please wait admin approve");
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      name: name,
      tags: tags,
      thumbnail: thumbnail,
      userId: user.id,
      template: state.components,
    };
    console.log(newData);
    let formData = new FormData();
    for (let key in newData) {
      formData.append(key, newData[key]);
    }
    publicTemplate(formData);
  };

  return (
    <div className="w-full flex items-center justify-center mt-16">
      <div className="flex gap-12">
        <div>
          <h2 className="text-3xl font-semibold mb-8">Public template</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <label className="mb-4 text-left w-full">
              <input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded"
                required
              />
            </label>
            <label className="mb-4 w-full text-left">
              <input
                placeholder="Tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded"
                required
              />
            </label>
            <label className="mb-4 text-left">
              <input
                placeholder="Tags"
                type="file"
                // value={thumbnail}
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </label>
            <div className="w-full flex justify-end">
              <CustomButton
                text={"Public"}
                classContent={
                  "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
                }
                isLoading={loadingPublicTemplate}
              />
            </div>
          </form>
        </div>
        <div>
          <div className="h-[200px] w-[300px] flex justify-center items-center bg-[#eeeeef] rounded-md p-[16px]">
            <div className="w-full h-full flex items-center justify-center group cursor-pointer rounded-md ">
              {thumbnail && (
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt=""
                  className="w-full h-full object-contain rounded-md bg-cover"
                />
              )}
            </div>
          </div>
          <p className="flex items-center mt-[10px] group gap-2">{name}</p>
          <div className="flex gap-2 overflow-hidden h-[30px] text-[--primary-text]">
            {tags &&
              tags
                .split(" ")
                .map((tag, index) => <Tag key={index} content={tag} />)}
          </div>

          <p className=" font-normal text-[14px] mt-2">A5 - horizontal</p>
        </div>
      </div>
    </div>
  );
};

export default PublicTemplate;
