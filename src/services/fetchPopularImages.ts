import { Image } from "../types/types";
import unsplash from "./unsplash";

export const fetchPopularImages = async (
  page: number,
  perPage: number = 20
): Promise<Image[]> => {
  try {
    const response = await unsplash.get("/photos", {
      params: {
        page,
        per_page: perPage,
        order_by: "popular",
      },
    });
    // Return the array of photos fetched from the Unsplash API
    return response.data;
  } catch (error: any) {
    console.error("Error fetching more images:", error.response.data);
    throw error.response.data;
  }
};
