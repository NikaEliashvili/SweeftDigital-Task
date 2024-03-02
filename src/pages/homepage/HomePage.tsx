import { useCallback, useEffect, useState } from "react";
import { fetchPopularImages } from "../../services/fetchPopularImages";
import { Image } from "../../types/types";
import ImageCard from "../../components/imageCard/ImageCard";

import "./homePage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import searchImages from "../../services/searchImages";
import useDebounce from "../../hooks/useDebounce";

export default function HomePage() {
  const [popularImages, setPopularImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchBar, setSearchBar] = useState<string>("");
  const [cachedImages, setCachedImages] = useState<{
    [query: string]: Image[];
  }>({});

  const debouncedSearchBar = useDebounce(searchBar, 500);

  useEffect(() => {
    console.log({ searchBar });
    console.log({ debouncedSearchBar });

    if (debouncedSearchBar && debouncedSearchBar.length > 0) {
      fetchImages(debouncedSearchBar);
    }
  }, [debouncedSearchBar]);

  const fetchImages = useCallback(
    async (searchQuery: string) => {
      searchQuery = searchQuery.trim();
      try {
        if (cachedImages[searchQuery]) {
          setPopularImages(cachedImages[searchQuery]);
        } else {
          const images = await searchImages(searchQuery);
          if (images) {
            setCachedImages((prevCachedImages) => ({
              ...prevCachedImages,
              [searchQuery]: images,
            }));
            setPopularImages(images);
          }
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(`${error}. Please try again later.`);
      }
    },
    [cachedImages]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchBar(e.target.value);
  }

  useEffect(() => {
    if (!debouncedSearchBar || debouncedSearchBar.length === 0) {
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

      if (!debouncedSearchBar || debouncedSearchBar == "") {
        window.addEventListener("scroll", handleScroll);
      }
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [page, debouncedSearchBar]);

  return (
    <div>
      <h1 className="header">Popular Images</h1>
      <div className="searchbar-container">
        <SearchBar
          value={searchBar || ""}
          name="search"
          handleChange={handleChange}
        />
      </div>

      {cachedImages &&
        cachedImages[debouncedSearchBar] &&
        cachedImages[debouncedSearchBar].length && (
          <span className="results-span">
            Results for: {debouncedSearchBar}
          </span>
        )}

      <div className="images">
        {cachedImages &&
        cachedImages[debouncedSearchBar] &&
        cachedImages[debouncedSearchBar].length
          ? cachedImages[debouncedSearchBar].map((image) => (
              <ImageCard key={image.id} data={image} />
            ))
          : popularImages?.map((image) => (
              <ImageCard key={image.id} data={image} />
            ))}
        {loading &&
          Array(20)
            .fill(0)
            .map((_, index) => (
              <ImageCard.Skeleton key={index + 1} />
            ))}
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}
