import SwiperComponent from "./SwiperComponent";

export default function ({
  title,
  description,
  price,
  sqft,
  type,
  location,
  bathrooms,
  rooms,
  images,
  verified,
}: any) {
  return (
    <div className={`border rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative 
      ${verified ? "border-yellow-500 shadow-[0_0_15px_rgba(255,215,0,0.4)]" : "border-gray-200"}
    `}>
      {/* Verified Badge */}
      {verified && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[#FFD700] text-black text-[10px] sm:text-xs px-3 py-1 rounded-full font-semibold shadow-md z-10 border border-yellow-600">
         Verified
      </div>
      
      )}

      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/3 h-40 sm:h-48 md:h-64 lg:h-72 relative">
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <SwiperComponent images={images} />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 p-3 sm:p-4 flex flex-col justify-between bg-white">
          <div>
            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-3 line-clamp-2">
              {description}
            </p>

            {/* Location */}
            <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2">
              Location: <span className="font-medium text-gray-800">{location}</span>
            </p>

            {/* Property Details */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-3">
              {/* Rooms */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-700 text-lg sm:text-xl">🛏️</span>
                <p className="text-xs sm:text-sm text-gray-700">
                  <span className="font-medium text-gray-800">{rooms}</span> Rooms
                </p>
              </div>

              {/* Bathrooms */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-700 text-lg sm:text-xl">🚿</span>
                <p className="text-xs sm:text-sm text-gray-700">
                  <span className="font-medium text-gray-800">{bathrooms}</span> Bathrooms
                </p>
              </div>
            </div>
          </div>

          {/* Price & Type */}
          <div>
            <button className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded mb-2 shadow-md transition-colors duration-200
              ${verified ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-red-500 text-white hover:bg-red-600"}
            `}>
              {type}
            </button>
            <p className={`text-base sm:text-lg md:text-xl font-semibold
              ${verified ? "text-yellow-500" : "text-blue-600"}
            `}>
              Rs {price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
