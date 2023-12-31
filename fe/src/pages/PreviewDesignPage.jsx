import React, { useRef, useState } from "react";

import {
  cloneTemplateRoute,
  getTemplateByIdRoute,
  ratingTemplateRoute,
} from "../utils/APIRoute";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAPI, postAPI } from "../utils/FetchData";
import HeaderPreview from "../components/previewDeisgn/HeaderPreview";
import ContentPreview from "../components/previewDeisgn/ContentPreview";
import CommentPreview from "../components/previewDeisgn/CommentPreview";
import CustomButton from "../components/common/Button";
import { ToastContainer, toast } from "react-toastify";
import { ValidateService } from "../utils/ValidateService";

const PreviewDesignPage = () => {
  const { templateId } = useParams();
  const [user, setOpenAuthForm, showServiePackages] = useOutletContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: templateData } = useQuery({
    queryKey: ["template", templateId],
    queryFn: () => {
      return getAPI(`${getTemplateByIdRoute}/${templateId}/${user?.id}`);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
  });

  const { mutate: cloneTemplate, isLoading: loadingCloneTemplate } =
    useMutation({
      mutationFn: (info) => {
        return postAPI(cloneTemplateRoute, info);
      },
      onError: (error) => {
        // toast.error(error.response.data.message, toastOptions);
      },
      onSuccess: (data) => {
        toast.success(data.data.message, toastOptions);
        navigate(`/design/${data.data.productId}`)
      },
    });

  const { mutate: ratingTemplate } = useMutation({
    mutationFn: (info) => {
      return postAPI(ratingTemplateRoute, info);
    },
    onError: (error) => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["template", templateId]);
    },
  });

  const handleRatingTemplate = (templateId, rating) => {
    ratingTemplate({ templateId: templateId, userId: user.id, rating: rating });
  };
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const handleCloneTemplate = () => {
    if (!user?.access_token) {
      toast.error("Please login to use this function", toastOptions);
      return;
    }
    if (user.role.name === "Admin") {
      cloneTemplate({ templateId: templateId, userId: user.id });
    } else {
      if (
        templateData?.data.data.classService > 0 &&
        ValidateService(user) === "Free"
      ) {
        showServiePackages(true);
        return;
      } else {
        cloneTemplate({ templateId: templateId, userId: user.id });
      }
    }
  };
  return (
    <div className="w-full px-32">
      <HeaderPreview
        templateData={templateData?.data.data}
        handleRatingTemplate={handleRatingTemplate}
        currentRating={templateData?.data.currentRating?.rating}
      />
      <CustomButton
        text={"Clone"}
        classContent={
          "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
        }
        handleClick={handleCloneTemplate}
        isLoading={loadingCloneTemplate}
      />

      <ContentPreview templateData={templateData?.data.data.template_pages} />

      <CommentPreview
        user={user}
        templateId={templateData?.data.data.id}
        setOpenAuthForm={setOpenAuthForm}
      />

      <ToastContainer />
    </div>
  );
};

export default PreviewDesignPage;
