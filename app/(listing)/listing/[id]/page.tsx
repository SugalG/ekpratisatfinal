import FavouriteButton from "@/components/FavouriteButton";
import { listingDetailAction } from "@/action/listingDetailAction";
import SwiperFullComponent from "@/components/SwiperFullComponent";
import { getListingAction } from "@/action/getListingAction";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";
import amenityIcons from "@/components/amenityIcons"; // Import the amenityIcons mapping

// Function to generate static params for the dynamic [id] route
export async function generateStaticParams() {
  const listings: any = await getListingAction();
  return listings.map((listing: any) => ({
    id: listing.id.toString(),
  }));
}

// Metadata for the page
export const metadata = {
  revalidate: 60 * 60 * 24, // Regenerates the static page every 24 hours
};

// Page component that receives dynamic route params
export default async function Page({ params }: any) {
  const param = await params;
  const session = await getServerSession(NEXT_AUTH);
  const response = await listingDetailAction(param.id);

  const property = response.listing;
  const userId = session?.user.id || null;

  if (!property) {
    return (
      <div className="h-full flex items-center justify-center">
        No listing found
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="container mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Image Section with Golden Border for Verified Listings */}
        <div
          className={`w-full ${
            property.verified ? "border-4 border-yellow-500 shadow-lg shadow-yellow-300" : ""
          } rounded-lg overflow-hidden`}
        >
          <SwiperFullComponent images={property.images} />
        </div>

        <div className="p-6 relative">
          {/* Verified Badge */}
          {property.verified && (
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[#FFD700] text-black text-[10px] sm:text-xs px-3 py-1 rounded-full font-semibold shadow-md z-10 border border-yellow-400 flex items-center">
              Verified
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
          <p className="text-green-500 text-2xl font-semibold mt-2">
            Rs. {property.price.toLocaleString()}
          </p>
          <p className="text-gray-600 text-lg mt-1">{property.location}</p>
          <p className="text-gray-700 text-md mt-4">{property.description}</p>

          {/* Property details grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {property.bedrooms !== null && (
              <div className="flex items-center space-x-2">
                <span className="text-xl">🛏️</span>
                <p className="text-gray-600 text-md">{property.bedrooms} Bedrooms</p>
              </div>
            )}
            {property.bathrooms !== null && (
              <div className="flex items-center space-x-2">
                <span className="text-xl">🛁</span>
                <p className="text-gray-600 text-md">{property.bathrooms} Bathrooms</p>
              </div>
            )}
            {property.landArea !== null && (
              <div className="flex items-center space-x-2">
                <span className="text-xl">📐</span>
                <p className="text-gray-600 text-md">{property.landArea} sqft</p>
              </div>
            )}
        </div>

        {/* Additional details */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Additional Details</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p className="text-gray-700">
              <strong>Category:</strong> {property.category}
            </p>
            <p className="text-gray-700">
              <strong>Type:</strong> {property.type}
            </p>
            <p className="text-gray-700">
              <strong>House Area:</strong> {property.houseArea} sqft
            </p>
            <p className="text-gray-700">
              <strong>Floors:</strong> {property.numberOfFloors}
            </p>
          </div>
        </div>

        {/* 🌟 Amenities Section */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              {property.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-xl text-gray-600">
                    {amenityIcons[amenity]} {/* Render the icon */}
                  </span>
                  <p className="text-gray-700 text-md">{amenity}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {session && (
          <div className="mt-6 flex justify-start">
            <FavouriteButton listingId={property.id} userId={userId} />
          </div>
        )}
      </div>
    </div>
    </div >
  );
}
