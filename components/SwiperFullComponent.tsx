// "use client";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/zoom';
// import { Pagination, Navigation, Zoom } from 'swiper/modules';
// import { useState, useRef } from "react";

// export default function SwiperFullComponent({ images }: any) {
//   const [fullscreenStartIndex, setFullscreenStartIndex] = useState(0);
//   const dialogRef = useRef<HTMLDialogElement>(null);
//   const fullscreenSwiperRef = useRef<any>(null);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const backdropRef = useRef<HTMLDivElement>(null);

//   const openFullscreen = (index: number) => {
//     setFullscreenStartIndex(index);
//     setIsZoomed(false);
//     dialogRef.current?.showModal();
//   };

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     // Only close if clicking directly on the backdrop (not its children)
//     if (e.target === backdropRef.current && !isZoomed) {
//       dialogRef.current?.close();
//     }
//   };

//   const toggleZoom = () => {
//     if (!fullscreenSwiperRef.current?.swiper) return;
//     const swiper = fullscreenSwiperRef.current.swiper;
//     isZoomed ? swiper.zoom.out() : swiper.zoom.in();
//     setIsZoomed(!isZoomed);
//   };

//   if (!Array.isArray(images) || images.length === 0) {
//     return <div>No images available</div>;
//   }

//   return (
//     <>
//       {/* Main Swiper (unchanged) */}
//       <Swiper
//         pagination={{ clickable: true }}
//         navigation={true}
//         modules={[Pagination, Navigation]}
//         className="image-swiper w-full h-[800px] bg-gray-200 rounded-lg"
//       >
//         {images.map((image: any, index: number) => (
//           <SwiperSlide 
//             key={index} 
//             className="flex items-center justify-center w-full h-[800px] cursor-zoom-in"
//             onClick={() => openFullscreen(index)}
//           >
//             <img
//               src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`}
//               alt={`Property Image ${index + 1}`}
//               className="rounded-lg object-cover w-full h-full"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Fullscreen Dialog - Fixed Backdrop Click */}
//       <dialog
//         ref={dialogRef}
//         className="fixed inset-0 z-50 bg-black/90 w-full h-full max-w-none max-h-none border-none p-0 overflow-hidden"
//       >
//         <div 
//           ref={backdropRef}
//           className="absolute inset-0"
//           onClick={handleBackdropClick}
//         >
//           {/* This div captures backdrop clicks */}
//         </div>

//         <button
//           onClick={() => dialogRef.current?.close()}
//           className="absolute top-4 right-4 text-white text-3xl z-50 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition"
//           aria-label="Close"
//         >
//           ×
//         </button>

//         <Swiper
//           initialSlide={fullscreenStartIndex}
//           navigation
//           pagination={{ type: 'fraction' }}
//           zoom={{ maxRatio: 3, toggle: true }}
//           modules={[Navigation, Pagination, Zoom]}
//           className="w-full h-full"
//           ref={fullscreenSwiperRef}
//           onClick={(swiper, e) => {
//             // Prevent backdrop click when interacting with swiper
//             e.stopPropagation();
//           }}
//         >
//           {images.map((image: any, index: number) => (
//             <SwiperSlide key={index} className="flex items-center justify-center">
//               <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
//                 <img
//                   src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`}
//                   alt={`Property Image ${index + 1}`}
//                   className="max-w-full max-h-full object-contain"
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <div className="absolute bottom-4 left-0 right-0 flex justify-center">
//           <button
//             onClick={toggleZoom}
//             className="bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition"
//           >
//             {isZoomed ? 'Zoom Out' : 'Zoom In'}
//           </button>
//         </div>
//       </dialog>
//     </>
//   );
// }




"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import { Pagination, Navigation, Zoom } from 'swiper/modules';
import { useState, useRef, useEffect } from "react";

export default function SwiperFullComponent({ images }: any) {
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fullscreenSwiperRef = useRef<any>(null);
  const thumbnailSwiperRef = useRef<any>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const clickedIndexRef = useRef(0);

  const openFullscreen = (index: number) => {
    clickedIndexRef.current = index;
    setFullscreenIndex(index);
    setIsZoomed(false); // Reset zoom state when opening
    dialogRef.current?.showModal();
  };

  const closeFullscreen = () => {
    // Reset zoom before closing
    if (fullscreenSwiperRef.current?.swiper?.zoom?.scale > 1) {
      fullscreenSwiperRef.current.swiper.zoom.out();
    }
    setIsZoomed(false);
    dialogRef.current?.close();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && !isZoomed) {
      closeFullscreen();
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fullscreenSwiperRef.current?.swiper) return;
    const swiper = fullscreenSwiperRef.current.swiper;
    swiper.zoom.in();
    setIsZoomed(true);
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fullscreenSwiperRef.current?.swiper) return;
    const swiper = fullscreenSwiperRef.current.swiper;
    swiper.zoom.out();
    setIsZoomed(false);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fullscreenSwiperRef.current?.swiper) return;
    const swiper = fullscreenSwiperRef.current.swiper;
    
    if (swiper.zoom.scale > 1) {
      swiper.zoom.out();
      setIsZoomed(false);
    } else {
      swiper.zoom.in();
      setIsZoomed(true);
    }
  };

  // Reset zoom when opening/closing
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleOpen = () => {
      if (fullscreenSwiperRef.current?.swiper) {
        fullscreenSwiperRef.current.swiper.slideTo(clickedIndexRef.current, 0);
        // Ensure zoom is reset
        if (fullscreenSwiperRef.current.swiper.zoom.scale > 1) {
          fullscreenSwiperRef.current.swiper.zoom.out();
        }
      }
    };

    dialog.addEventListener('open', handleOpen);
    return () => dialog.removeEventListener('open', handleOpen);
  }, []);

  if (!Array.isArray(images) || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <>
      {/* Thumbnail Swiper */}
      <Swiper
        ref={thumbnailSwiperRef}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="image-swiper w-full h-[800px] bg-gray-200 rounded-lg"
      >
        {images.map((image: any, index: number) => (
          <SwiperSlide 
            key={index} 
            className="flex items-center justify-center w-full h-[800px] cursor-zoom-in"
            onClick={() => openFullscreen(index)}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`}
              alt={`Property Image ${index + 1}`}
              className="rounded-lg object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fullscreen Dialog */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-50 bg-black/90 w-full h-full max-w-none max-h-none border-none p-0 overflow-hidden"
        onClick={handleBackdropClick}
      >
        <div className="relative w-full h-full">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white text-3xl z-50 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition"
            aria-label="Close"
          >
            ×
          </button>

          <Swiper
            key={fullscreenIndex}
            initialSlide={fullscreenIndex}
            navigation
            pagination={{ type: 'fraction' }}
            zoom={{ 
              maxRatio: 3,
              toggle: false // Disable default toggle behavior
            }}
            modules={[Navigation, Pagination, Zoom]}
            className="w-full h-full"
            ref={fullscreenSwiperRef}
            onSlideChange={(swiper) => setFullscreenIndex(swiper.activeIndex)}
          >
            {images.map((image: any, index: number) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div 
                  className="swiper-zoom-container w-full h-full flex items-center justify-center"
                  onClick={handleZoomIn}
                  onDoubleClick={handleDoubleClick}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.url}`}
                    alt={`Property Image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </dialog>
    </>
  );
}