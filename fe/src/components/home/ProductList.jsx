import React from "react";
import CustomButton from "../common/Button";
import { useNavigate } from "react-router-dom";
import DesignCard from "./DesignCard";

const ProductList = ({
  productData,
  handleNewTemplate,
  loadingCloneTemplate,
  handleSaveName,
  isLoadingProductData,
}) => {
  return (
    <>
      <div className="content col-span-full select-none text-xl flex justify-between items-center pb-2 font-semibold">
        <div className="content col-span-full select-none text-[18px] flex justify-start font-bold">
          Recent Design
        </div>
        <CustomButton
          text={"Create Design"}
          classContent={
            "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
          }
          handleClick={handleNewTemplate}
          isLoading={loadingCloneTemplate}
        />
      </div>

      <div className="w-full grid grid-cols-4 gap-8">
        {isLoadingProductData ? (
          <div>loading</div>
        ) : (
          <>
            {productData &&
              productData.map((product, index) => (
                <DesignCard info={product} handleSaveName={handleSaveName} />
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
