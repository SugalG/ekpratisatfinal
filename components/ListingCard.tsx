
// export default function ({ title, description, location, price, image }: any) {
//     console.log("Images is ", image)
//     return (
//         <div className="border p-2 w-[300px]">
//             <div className="w-36 h-36 border-2 border-black mb-10 mx-auto"></div>
//             <div className="font-custom text-3xl font-bold">{title}</div>
//             <div>
//                 {description.length > 35 ? `${description.substring(0, 35)}...` : description}
//             </div>

import SwiperComponent from "./SwiperComponent";

//             <div>  {location.length > 35 ? `${location.substring(0, 35)}...` : location}</div>
//             <div>Rs. {price}</div>

//         </div>
//     )
// }

// export default function ListingCard({ title, description, location, price, images }: any) {
//   return (
//     <div className="border p-2 max-w-[300px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-[400px] flex flex-col">
//       {/* Image Container */}
//       <div className="border-2 border-black mb-4 mx-auto h-[200px] overflow-hidden w-full">
//         {images && images.length > 0 ? (
//           <SwiperComponent images={images} />
//         ) : (
//           <p>No images available</p>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="flex flex-col flex-1 justify-between">
//         <div className="font-custom text-2xl sm:text-3xl font-bold mb-2">{title}</div>
//         <div className="mb-2">
//           {description.length > 35 ? `${description.substring(0, 35)}...` : description}
//         </div>
//         <div className="mb-2">
//           {location.length > 35 ? `${location.substring(0, 35)}...` : location}
//         </div>
//         <div>Rs. {price}</div>
//       </div>
//     </div>
//   );
// }



export default function ListingCard({
  title,
  description,
  location,
  price,
  oldPrice,
  beds,
  baths,
  sqft,
  images,
  type,
  verified,
  category,
}: any) {

  return (
    <div className="relative w-full max-w-[430px] h-auto mb-20">
      {/* Background Card (Image) */}
      <div className={`relative h-[250px] w-full rounded-lg overflow-hidden shadow-lg
        ${verified ? "border-2 border-yellow-500 shadow-[0_0_15px_rgba(255,215,0,0.6)]" : ""}
      `}>
        {images && images.length > 0 ? (
          <SwiperComponent images={images} />
        ) : (
          <p className="text-center text-gray-500">No images available</p>
        )}
      </div>

      {/* Foreground Card (Info) */}
      <div className={`absolute top-[90%] left-[10%] right-[5%] p-4 rounded-lg z-10 transition-all duration-300
        ${verified ? "bg-black bg-opacity-90 border border-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.6)]" : "bg-white shadow-lg"}
      `}>
        {/* Price Info */}
        <div className="mb-2">
          <span className={`font-bold text-lg ${verified ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0]" : "text-black"}`}>
            Rs. {price}{type === "rent" ? "/month" : ""}
          </span>
        </div>

        {/* Property Details */}
        <div className={`flex items-center text-sm mb-2 ${verified ? "text-gray-400" : "text-gray-600"}`}>
          {baths !== null && <span>🚿 {baths}</span>}
          {sqft !== null && <span className="ml-2">🏢 {sqft} sqft</span>}
          {beds !== null && <span className="ml-2">🏡 {beds}</span>}
        </div>

        {/* Verified Status */}
        {verified && (
          <div className="absolute top-2 right-2 bg-[#FFD700] text-black text-xs px-3 py-1 rounded-full font-semibold">
            Verified
          </div>
        )}

        {/* Title and Location */}
        <div className={`text-lg font-bold ${verified ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0]" : "text-black"}`}>
          {title}
        </div>
        <div className={`flex justify-between ${verified ? "text-gray-400" : "text-gray-500"}`}>
          <div>{location}</div>
          <div className="capitalize">{category?.replaceAll("_", " ") || ""}</div>
        </div>
      </div>
    </div>
  );
}


