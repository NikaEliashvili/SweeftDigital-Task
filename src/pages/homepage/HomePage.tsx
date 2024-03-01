import { useEffect, useState } from "react";
import { fetchPopularImages } from "../../services/fetchPopularImages";
import { Image } from "../../types/types";
import ImageCard from "../../components/imageCard/ImageCard";

import "./homePage.css";

export default function HomePage() {
  const [popularImages, setPopularImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const newImages = await fetchPopularImages(page);

        if (page === 1) {
          setPopularImages(newImages);
        } else {
          setPopularImages((prevImages) => [
            ...prevImages,
            ...newImages,
          ]);
        }
      } catch (error) {
        console.error("Error fetching more images:", error);
        setError(`${error}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    loadImages();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <div>
      <h1>Popular Images</h1>
      <div className="images">
        {popularImages?.map((image) => (
          <ImageCard key={image.id} data={image} />
        ))}
        {loading &&
          Array(10)
            .fill(0)
            .map((_, index) => (
              <ImageCard.Skeleton key={index + 1} />
            ))}
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}
