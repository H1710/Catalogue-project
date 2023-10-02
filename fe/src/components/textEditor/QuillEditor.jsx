import React, { useEffect, useRef, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import ImageResize from "quill-image-resize-module-react";

// import { checkImage, imageUpload } from "../../utils/ImageUpload";
// import { ALERT } from "../../redux/types/alertType";
// import { useAppDispatch } from "../../redux/hooks";

const QuillEditor = ({ setBody }) => {
  // const dispatch = useAppDispatch();
  const quillRef = useRef(null);
  window.Quill = Quill;
  Quill?.register("modules/imageResize", ImageResize);
  const modules = {
    toolbar: { container },
    imageResize: {
      parchment: Quill?.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  // Custom image
  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (!files) return alert("File not exist");

      const file = files[0];
      // const check = checkImage(file);
      // if (check) return alert(check);

      const photo = await imageUpload(file);

      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
      }
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        ref={quillRef}
        className=""
      />
    </div>
  );
};

let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

export default QuillEditor;
