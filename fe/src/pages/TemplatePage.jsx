import React, { useEffect, useState } from "react";
import Search from "../components/home/Search";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { getAcceptTemplateRoute, searchTemplateRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function TemplatePage() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const navigate = useNavigate();
  useEffect(() => {
    const getSearch = async () => {
      try {
        const result = await axios.get(`${searchTemplateRoute}/${search}`);
        setData(result.data.templates);
      } catch (error) {}
    };
    getSearch();
  }, [search]);

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const { data: templateList, isLoading } = useQuery({
    queryFn: () => {
      return getAPI(getAcceptTemplateRoute);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error("No template here", toastOptions);
    },
  });

  return (
    <div className="w-full h-full items-center justify-center overflow-auto p-4">
      <div
        className="rounded-[5px] w-full mb-2 h-[250px] flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)",
        }}
      >
        <Search />
      </div>

      {search ? (
        <div>
          <div className="p-2 font-semibold">Search result for '{search}'</div>
          <div className="w-full grid grid-cols-4 gap-8">
            {data.length > 0 &&
              data?.map((template, index) => (
                <div key={index} className="relative">
                  {template.classService ? (
                    <div className="absolute bg-[#8b3dff] rounded-full top-1 left-1">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        // strokeWidth={1.5}
                        viewBox="0 0 16 16"
                        className="h-6 w-6 p-1"
                      >
                        <path
                          fill="rgb(255,255,255)"
                          d="M7.51 4.87C7.01 6.27 6.45 6.95 5.94 7c-.57.07-1.07-.18-1.54-.8a.54.54 0 0 0-.1-.1 1 1 0 1 0-.8.4l.01.12.82 3.24A1.5 1.5 0 0 0 5.78 11h4.44a1.5 1.5 0 0 0 1.45-1.14l.82-3.24a.54.54 0 0 0 .01-.12 1 1 0 1 0-.8-.4.54.54 0 0 0-.1.09c-.49.62-1 .87-1.54.81-.5-.05-1.04-.74-1.57-2.13a1 1 0 1 0-.98 0zM11 11.75a.5.5 0 1 1 0 1H5a.5.5 0 1 1 0-1h6z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className="flex justify-center items-center bg-[#eeeeef] rounded-md p-[16px]"
                    key={index}
                    onClick={() => {
                      navigate(`/design/preview/${template.id}`);
                    }}
                  >
                    <div className="w-full h-[100px] flex items-center justify-center group cursor-pointer rounded-md">
                      <img
                        src={template.thumbnail}
                        alt=""
                        className="w-full h-full object-contain rounded-md bg-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] mt-[10px]">
                      {template.name}
                    </p>
                  </div>
                  <p className=" font-normal text-[14px] mt-2">
                    A5 - horizontal
                  </p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div className="p-2 font-semibold">Template</div>
          <div className="w-full grid grid-cols-4 gap-8">
            {templateList?.data?.length > 0 ? (
              templateList?.data?.map((template, index) => (
                <div key={index} className="relative">
                  {template.classService ? (
                    <div className="absolute bg-[#8b3dff] rounded-full top-1 left-1">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        // strokeWidth={1.5}
                        viewBox="0 0 16 16"
                        className="h-6 w-6 p-1"
                      >
                        <path
                          fill="rgb(255,255,255)"
                          d="M7.51 4.87C7.01 6.27 6.45 6.95 5.94 7c-.57.07-1.07-.18-1.54-.8a.54.54 0 0 0-.1-.1 1 1 0 1 0-.8.4l.01.12.82 3.24A1.5 1.5 0 0 0 5.78 11h4.44a1.5 1.5 0 0 0 1.45-1.14l.82-3.24a.54.54 0 0 0 .01-.12 1 1 0 1 0-.8-.4.54.54 0 0 0-.1.09c-.49.62-1 .87-1.54.81-.5-.05-1.04-.74-1.57-2.13a1 1 0 1 0-.98 0zM11 11.75a.5.5 0 1 1 0 1H5a.5.5 0 1 1 0-1h6z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div
                    className="flex justify-center items-center bg-[#eeeeef] rounded-md p-[16px]"
                    key={index}
                    onClick={() => {
                      navigate(`/design/preview/${template.id}`);
                    }}
                  >
                    <div className="w-full h-[100px] flex items-center justify-center group cursor-pointer rounded-md">
                      <img
                        src={template.thumbnail}
                        alt=""
                        className="w-full h-full object-contain rounded-md bg-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] mt-[10px]">
                      {template.name}
                    </p>
                  </div>
                  <p className=" font-normal text-[14px] mt-2">
                    A5 - horizontal
                  </p>
                </div>
              ))
            ) : (
              <div className="p-2 text-[20px]">No template</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
