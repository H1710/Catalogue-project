import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  getProductByUser,
  createBlankProductRoute,
  saveProductNameRoute,
  getAcceptTemplate,
} from "../utils/APIRoute";

import { getAPI, postAPI } from "../utils/FetchData";
import { useMutation, useQuery, useQueryClient } from "react-query";
import TemplateList from "../components/home/TemplateList";
import ProductList from "../components/home/ProductList";

const HomePage = () => {
  const [user, setOpenAuthForm] = useOutletContext();
  const queryClient = useQueryClient();

  const { data: templateData, isLoading: isLoadingTemplateData } = useQuery({
    queryKey: ["templates"],
    queryFn: () => {
      return getAPI(`${getAcceptTemplate}`);
    },
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
  });

  const { data: productData, isLoading: isLoadingProductData } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: () => {
      return getAPI(`${getProductByUser}/${user?.id}`);
    },
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
  });

  const { mutate: cloneTemplate, isLoading: loadingCloneTemplate } =
    useMutation({
      mutationFn: (info) => {
        return postAPI(createBlankProductRoute, { userId: info.userId });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["products", user?.id]);
      },
    });

  const handleNewTemplate = () => {
    if (!user) {
      setOpenAuthForm(true);
    } else {
      cloneTemplate({ userId: user.id });
    }
  };

  const { mutate: saveNameProduct, isLoading: loadingSaveName } = useMutation({
    mutationFn: (info) => {
      return postAPI(saveProductNameRoute, info);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      // toast.success(data.data.message, toastOptions);
      // localStorage.setItem("signed", "chat-app");
      // navigate("/");
    },
  });

  const handleSaveName = (productId, newName) => {
    saveNameProduct({ productId, newName });
  };

  return (
    <div className="w-full h-full items-center justify-center overflow-auto p-4">
      <div
        className="rounded-[5px] w-full mb-2 h-[250px] flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)",
        }}
      >
        {/* <Search /> */}
      </div>

      <br />
      <TemplateList
        user={user}
        templateList={templateData?.data.templates}
        isLoadingTemplateData={isLoadingTemplateData}
      />
      {/* <div className="pt-6 pr-8 pb-12 pl-8 col-span-full">
        <Slider templateList={templateList} />
      </div> */}

      <br />
      {user?.access_token && (
        <ProductList
          productData={productData?.data.products}
          handleNewTemplate={handleNewTemplate}
          loadingCloneTemplate={loadingCloneTemplate}
          handleSaveName={handleSaveName}
          isLoadingProductData={isLoadingProductData}
        />
      )}
    </div>
  );
};

export default HomePage;
