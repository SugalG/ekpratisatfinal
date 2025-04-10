import ListingCard from "@/components/ListingCard";
import { getListingService } from "@/services/getListingService";
import axios from "axios";
import RecentAll from "./RecentAll";


// export const dynamic = "force-dynamic";
export default async function () {
  try {
        const data: any = await getListingService();
        

    if (!data || data.length === 0) {
      return (
        <div className="font-bold text-7xl flex items-center justify-center h-full">
          No data available
        </div>
      );
    }

    return (
      <div id="listing-section" className="max-w-7xl mx-auto pb-10 px-4 pt-4 mt-20">
        <div className="flex justify-between items-center pb-4">
        <div className="text-base md:text-xl lg:text-3xl font-bold font-custom">Recent Listings</div>
        <RecentAll/>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
          {data.map((item :any, index: any) => (
            <div key={index} className="flex justify-center">
              <a href={`/listing/${item.id}`} className="w-full max-w-[400px]">
                <ListingCard 
                  title={item.title}
                  description={item.description}
                  location={item.location}
                  price={item.price}
                  verified = {item.verified}
                  beds={item.bedrooms}
                  baths={item.bathrooms}
                  sqft={item.area}
                  images={item.images}
                  type = {item.type}
                  category={item.category}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }catch(e){
    <div>

    </div>
  }
}

// export const fetchCache = "force-no-store";
