import ListingCard from "@/components/ListingCard";
import { getVerifiedListingAction } from "@/action/getVerifiedListingAction";  // Importing the verified listing action

import ViewAllVerified from "./ViewAllVerified";

export default async function VerifiedListings() {
  try {
    const data: any = await getVerifiedListingAction();  // Fetching the verified listings

    if (!data || data.length === 0) {
      return (
        <div className="font-bold text-7xl flex items-center justify-center h-full">
          No verified listings available.
        </div>
      );
    }

    return (
      <div id="listing-section" className="max-w-7xl mx-auto pb-10 px-4 pt-4">
        <div className="flex justify-between items-center pb-4">
          <div className="text-base md:text-xl lg:text-3xl font-bold font-custom">Verified Listings</div>
          <ViewAllVerified/>  {/* Render the 'View All Verified Listings' button */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14">
          {data.map((item: any, index: any) => (
            <div key={index} className="flex justify-center">
              <a href={`/listing/${item.id}`} className="w-full max-w-[400px]">
                <ListingCard 
                  title={item.title}
                  description={item.description}
                  location={item.location}
                  price={item.price}
                  verified={item.verified}
                  beds={item.bedrooms}
                  baths={item.bathrooms}
                  sqft={item.area}
                  images={item.images}
                  type={item.type}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (e) {
    return (
      <div className="font-bold text-7xl flex items-center justify-center h-full">
        Something went wrong while fetching listings.
      </div>
    );
  }
}
