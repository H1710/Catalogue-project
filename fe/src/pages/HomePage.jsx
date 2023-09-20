import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTemplateRoute } from "../utils/APIRoute";
import axios from "axios";
import Template from "../components/Template";

const HomePage = () => {
  const [templateList, setTemplateList] = useState("");
  const [templateNumber, setTemplateNumber] = useState(0);
  const [template, setTemplate] = useState("");
  useEffect(() => {
    const handleAPI = async () => {
      const res = await axios.get(`${getTemplateRoute}/1`);
      setTemplateList(res.data.data);
    };
    handleAPI();
  }, []);
  const handleSubmit = () => {
    if (template !== 0) {
      setTemplate(templateList[templateNumber - 1]);
    }
    console.log(template);
  };
  return (
    <div className="flex justify-center mt-2">
      HomePage
      <div>
        <input
          type="number"
          onChange={(e) => setTemplateNumber(e.target.value)}
          max={templateList.length}
          min={0}
        />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
      <Link to={`designer`}>Designer Page</Link>
      {template && <Template template={template} setTemplate={setTemplate} />}
    </div>
  );
};

export default HomePage;
