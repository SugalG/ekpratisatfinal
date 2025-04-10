"use client";

import { getVerifiedListingAction } from "@/action/getVerifiedListingAction";
import { useRouter } from "next/navigation";

export default function (){
    const router=useRouter();

    const handleClick=async ()=>{
        try{
            const response: any = await getVerifiedListingAction();
            console.log(response)
            sessionStorage.setItem("searchResults",JSON.stringify(response));
            router.push("/results?query=verified");
        }catch(e){
            console.log(e);
        }
    };
    return(
        <div
      className="p-2 bg-[#FFD700] text-black text-sm md:text-base cursor-pointer hover:bg-[#e6ca2e] rounded-lg shadow-lg"
      onClick={handleClick}
    >
      View All {'>>'}
    </div>
    );
}