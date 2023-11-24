import React, { useCallback, useRef, useState } from "react";
import CustomButton from "../common/Button";
import { useMutation, useQueryClient } from "react-query";
import { patchAPI } from "../../utils/FetchData";
import {
  acceptTemplateRoute,
  rejectTemplateRoute,
  updateClassTemplateRoute,
} from "../../utils/APIRoute";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const PreviewTemplate = ({ template }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //  const [type, setType] = useState(0);
  const selectRef = useRef(0);
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const { mutate: acceptTemplate, isLoading: loadingAcceptTemp } = useMutation({
    mutationFn: (info) => {
      return patchAPI(`${acceptTemplateRoute}`, info);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["templates"]);
      toast.success(data.data.message, toastOptions);
    },
    onError: (error) => {
      toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  const { mutate: rejectTemplate, isLoading: loadingRejectTemp } = useMutation({
    mutationFn: (info) => {
      return patchAPI(`${rejectTemplateRoute}`, info);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["templates"]);
      toast.success(data.data.message, toastOptions);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });
  const { mutate: updateClassService, isLoading: loadingUpdateClassService } =
    useMutation({
      mutationFn: (info) => {
        return patchAPI(`${updateClassTemplateRoute}/${info.id}`, { info });
      },
      onSuccess: (data) => {
        // toast.success(data.data.message, toastOptions);
      },
      onError: (error) => {
        toast.error(error.response.data.message, toastOptions);
      },
      // enabled: logged,
    });

  const handleAcceptTemp = useCallback((tempId) => {
    acceptTemplate({ templateId: tempId });
    updateClassService({ id: tempId, classService: selectRef.current.value });
    selectRef.current.value = 0;
  }, []);
  const handleRejectTemp = useCallback((tempId) => {
    rejectTemplate({ templateId: tempId });
  }, []);

  return (
    <div className="py-2 gap-3 flex flex-col px-4 rounded border border-[--border-input] mt-4 cursor-pointer">
      <div className="flex items-start gap-8">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-[300px] h-[180px] object-cover rounded"
          onClick={() => {
            navigate(`/design/preview/${template.id}`);
          }}
        />

        <div className="w-full">
          <p className="font-semibold text-[--primary-text] mb-2 text-2xl">
            {template.name}
          </p>
          <div className="my-4 text-sm">
            <label htmlFor="Class Service" className="block text-black">
              Class service
            </label>
            <select
              ref={selectRef}
              defaultValue={0}
              className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-[120px]"
            >
              <option value="0">Free</option>
              <option value="1">Premium</option>
            </select>
          </div>
        </div>
      </div>
      {template?.status === "Processing" && (
        <div className="w-full flex justify-end gap-2">
          <CustomButton
            text={"Accept"}
            classContent={
              "bg-[--bg-button-success] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-success-hover]"
            }
            handleClick={() => handleAcceptTemp(template.id)}
            isLoading={loadingAcceptTemp}
          />
          <CustomButton
            text={"Reject"}
            classContent={
              "bg-[--bg-button-danger] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-danger-hover]"
            }
            handleClick={() => handleRejectTemp(template.id)}
            isLoading={loadingRejectTemp}
          />
        </div>
      )}
    </div>
  );
};

export default PreviewTemplate;
