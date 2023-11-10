import React from "react";
import CustomButton from "../common/Button";
import { useNavigate } from "react-router-dom";

const ProductList = ({
  productData,
  handleNewTemplate,
  loadingCloneTemplate,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="content col-span-full select-none text-xl flex justify-between items-center pb-2 font-semibold">
        <p>Current Design</p>
        <CustomButton
          text={"Create Design"}
          classContent={
            "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
          }
          handleClick={() => handleNewTemplate()}
          isLoading={loadingCloneTemplate}
        />
      </div>

      <div className="w-full grid grid-cols-4 gap-6">
        {productData &&
          productData.map((product, index) => (
            <div>
              <div
                className="w-full flex justify-center items-center bg-[#eeeeef] rounded-md p-[16px]"
                key={index}
                onClick={() => {
                  navigate(`/design/${product.id}`);
                }}
              >
                <div className="h-full w-full flex items-center justify-center group cursor-pointer rounded-md ">
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              </div>
              <p className="font-semibold text-[14px] mt-2">{product.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductList;
