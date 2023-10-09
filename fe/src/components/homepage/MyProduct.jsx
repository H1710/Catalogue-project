import { useContext } from "react";



function MyProduct({myProduct}) {
  
    return ( 
       <>
            <div  className="content text-[18px] flex justify-start pb-2">Current Design</div>
            <div className="pd-[120px] pt-4 grid  gap-3 items-center justify-center flex " > 
             
                {myProduct.map((product, index) =>(
                    <div className="  border-slate-300 h-[250px] w-[320px] object-cover justify-center relative flex bg-stone-100 rounded-[5px] " key={index}>
                        <img src={product.thumbnailUrl} alt=''  className="h-[170px] mt-3"/>
                       <div className="absolute bg-white h-14 bottom-0 w-full"> <p className="p-2  ">{product.name}</p></div>
                    </div>
                ))}
    
            </div>
       </>
     );
}

export default MyProduct;