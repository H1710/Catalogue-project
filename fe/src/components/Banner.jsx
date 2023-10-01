import React, {useEffect, useRef, useState} from "react";
import  {ImageBanners} from '../shared/Banner'

function Banner() {
    const max = ImageBanners.length -1;
    
    const [image, setImage] = useState(ImageBanners[0]);
    
    useEffect(()=> {
        let index = 0;
        const timer = setInterval(() =>{
           
            index ++;
            if (index > max){
                index = 0;
            }
            setImage(ImageBanners[index]);
             
             
        },5000)
        return ()=> clearInterval(timer)
    }, [])
    return ( 
        <div className="banner absolute overflow-hidden object-cover w-full h-full  ">
            <img src={image.src} alt=""
             className="w-full h-full object-cover"
             />
        </div>
     );
}

export default Banner;