import React, { useState } from "react";
import axios from "axios";
import { createTemplateRoute } from "../utils/APIRoute";
import { Link } from "react-router-dom";

const DesignerPage = () => {
  const [dataTemplate, setDataTemplate] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleAPI = async () => {
      await axios.post(createTemplateRoute, {
        info: dataTemplate,
      });
      alert("Upload success!");
    };
    handleAPI();
  };

  const handleChange = (e) => {
    const uploadedFile = e.target.files[0];
    // if (
    //   uploadedFile.type !== "text/javascript" &&
    //   uploadedFile.type !== "application/x-javascript"
    // ) {
    //   alert("Wrong file type == " + uploadedFile.type);
    //   return false;
    // }
    if (uploadedFile) {
      var readFile = new FileReader();
      readFile.onload = function (e) {
        var contents = e.target.result;
        var json = JSON.parse(contents);
        setDataTemplate(json);
      };
      readFile.readAsText(uploadedFile);
    } else {
      console.log("Failed to load file");
    }
  };

  return (
    <div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input type="file" onChange={(e) => handleChange(e)} />
        <button>Submit</button>
      </form>
      <Link to={`/`}>Home Page</Link>
    </div>
  );
};

export default DesignerPage;
