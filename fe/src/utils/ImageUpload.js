import axios from "axios";
import { uploadImageRoute } from "./APIRoute";

export const checkImage = (file) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "The largest image size is 1mb";
  if (!types.includes(file.type)) err = "The image type is png / jpeg";

  return err;
};

export const imageUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const data = await axios.post(uploadImageRoute, formData);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
