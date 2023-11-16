import React, { useState } from "react";
import Tag from "../Tag";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const CreateForm = ({ blog, setBlog }) => {
  //   const { categories } = useSelector((state) => state);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").max(50, "Title is too long"),
    tag: Yup.string().required("Tag is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    description: Yup.string().required("Description is required").max(300, "Description is too long"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      tag: "",
      thumbnail: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setBlog({ ...blog, [name]: value });
    formik.handleChange(e);
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
    formik.handleChange(e);
  };

  return (
    <form className="flex flex-col flex-1 gap-2" onSubmit={formik.handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={formik.values.title}
        name="title"
        // onChange={formik.handleChange}
        onChange={handleChangeInput}
        onBlur={formik.handleBlur}
        required
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        label="Tag"
        variant="outlined"
        fullWidth
        value={formik.values.tag}
        name="tag"
        onChange={handleChangeTag}
        onBlur={formik.handleBlur}
        required
        error={formik.touched.tag && Boolean(formik.errors.tag)}
        helperText={formik.touched.tag && formik.errors.tag}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => formik.setFieldValue("thumbnail", e.currentTarget.files[0])}
        onBlur={formik.handleBlur}
        required
        style={{ display: "none" }}
        id="thumbnail-upload"
      />
      <div className="">
        <input
          type="file"
          className="w-full border border-[--border-input] rounded py-1 px-2 outline-none text-sm"
          accept="image/*"
          onChange={handleChangeThumbnail}
          required
        />
      </div>
      {formik.touched.thumbnail && formik.errors.thumbnail && (
        <div className="text-red-500">{formik.errors.thumbnail}</div>
      )}

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={formik.values.description}
        name="description"
        onChange={handleChangeInput}
        onBlur={formik.handleBlur}
        required
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
    </form>
  );
};

export default CreateForm;