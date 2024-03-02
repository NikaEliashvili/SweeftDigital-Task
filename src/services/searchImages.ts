import unsplash from "./unsplash";

export default async function searchImages(query: string) {
  try {
    const response = await unsplash.get("/search/photos", {
      params: {
        query,
      },
    });

    return response.data.results;
  } catch (err) {
    console.log(err);
  }
}
