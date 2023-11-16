import React from "react";
import CustomButton from "../components/common/Button";
import { Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

const PreviewTemp = ({
    template,
    handleAcceptTemp,
    handleRejectTemp,
    loadingAcceptTemp
}) => {
    return (
        <div className=" py-2 gap-3 flex flex-col px-4 rounded border border-[--border-input]">



            <div className="flex items-start gap-8">


                <img
                    src={template.thumbnail} // Đặt đường dẫn của thumbnail tại đây
                    alt={template.name}
                    className="w-[350px] h-[230px] object-cover rounded" // Tuỳ chỉnh kích thước và góc bo tròn của thumbnail
                />

                <div className="w-full">
                    <p className="font-bold text-[--primary-text] mb-2 text-3xl">
                        {template.name}
                    </p>
                    <div className="flex items-center">
                        <Rating
                            name="template-rating"
                            value={template.rating} 
                            readOnly
                            precision={0.5} 
                            icon={<StarIcon fontSize="inherit" />} 
                            className="text-[--primary-text] mr-2" 
                        />
                        <span className="text-sm text-[--primary-text]">
                            ({template.rating} sao)
                        </span>
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
                    />
                </div>
            )}

        </div>
    );
};

export default PreviewTemp;
