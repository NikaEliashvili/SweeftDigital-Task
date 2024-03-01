//

import { Statistics } from "../types/types";
import unsplash from "./unsplash";

export default async function getImageStatistics(
  id: string
): Promise<Statistics> {
  try {
    const response = await unsplash.get(`photos/${id}/statistics`);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
