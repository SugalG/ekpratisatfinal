import Header from "./Header";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col">
        {/* <Header /> */}
        <div className="flex flex-col gap-6 px-4 sm:px-8 lg:px-28 max-w-7xl mx-auto font-custom min-h-[800px] justify-center">
          <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-6xl">
            Find your next <span className="text-slate-400">perfect</span>
            <br />
            place with ease
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm">
            Ekpratisat is the best place to find your next perfect place to
            live.
            <br />
            We have a wide range of properties for you to choose from.
          </p>
          <button className="mt-4 text-xs sm:text-sm text-blue-300 font-bold hover:underline">
            Let's get started...
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <a
          href="#listing-section"
          className="flex items-center justify-center w-20 h-20 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 ease-in-out animate-bounce"
        >
          {/* Arrow inside the bouncing circle */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
