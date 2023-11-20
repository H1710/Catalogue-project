import React, { useCallback } from "react";
import CustomButton from "../common/Button";
import { useMutation, useQueryClient } from "react-query";
import { patchAPI } from "../../utils/FetchData";
import { acceptTemplateRoute, rejectTemplateRoute } from "../../utils/APIRoute";
import { useNavigate } from "react-router";

const PreviewTemplate = ({ template }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: acceptTemplate, isLoading: loadingAcceptTemp } = useMutation({
    mutationFn: (info) => {
      return patchAPI(`${acceptTemplateRoute}`, info);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["templates"]);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  const { mutate: rejectTemplate, isLoading: loadingRejectTemp } = useMutation({
    mutationFn: (info) => {
      return patchAPI(`${rejectTemplateRoute}`, info);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["templates"]);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  const handleAcceptTemp = useCallback((tempId) => {
    acceptTemplate({ templateId: tempId });
  }, []);

  const handleRejectTemp = useCallback((tempId) => {
    rejectTemplate({ templateId: tempId });
  }, []);

  return (
    <div className="py-2 gap-3 flex flex-col px-4 rounded border border-[--border-input] mt-4 cursor-pointer">
      <div
        className="flex items-start gap-8"
        onClick={() => {
          navigate(`/design/preview/${template.id}`);
        }}
      >
        <img
          src={template.thumbnail} // Đặt đường dẫn của thumbnail tại đây
          alt={template.name}
          className="w-[180px] h-[180px] object-cover rounded" // Tuỳ chỉnh kích thước và góc bo tròn của thumbnail
        />

        <div className="w-full">
          <p className="font-semibold text-[--primary-text] mb-2 text-2xl">
            {template.name}
          </p>
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
          />
        </div>
      )}
    </div>
  );
};

export default PreviewTemplate;
