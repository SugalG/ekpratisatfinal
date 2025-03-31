"use server";

import {getUserFavouritesService} from "@/services/favouritesService"

export async function getUserFavouritesAction(userId: number) {
    // try {
      
    //   const favourites = await getUserFavouritesService(userId);
  
    //   // Check if there was an error or no favourites found
    // //   if (favourites.message) {
    // //     return {
    // //       success: false,
    // //       message: favourites.message,
    // //       error: favourites.error,
    // //     };
    // //   }
  
    //   return {
    //     success: true,
    //     favourites,
    //   };
    // } catch (e) {
    //   return {
    //     success: false,
    //     message: "An error occurred while fetching favourites",
    //     error: e,
    //   };
    // }
    return await getUserFavouritesService(userId)
  }