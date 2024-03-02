import { useCallback, useEffect, useState } from "react";
import { fetchPopularImages } from "../../services/fetchPopularImages";
import { CachedImages, Image } from "../../types/types";
import ImageCard from "../../components/imageCard/ImageCard";

import "./homePage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import searchImages from "../../services/searchImages";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

export default function HomePage() {
  const [popularImages, setPopularImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchBar, setSearchBar] = useState<string>("");
  const [cachedImages, setCachedImages] = useState<CachedImages>(
    JSON.parse(localStorage.getItem("history") as string) || {}
  );

  const debouncedSearchBar = useDebounce(
    searchBar.toLocaleLowerCase().trim(),
    500
  );

  useEffect(() => {
    if (debouncedSearchBar && debouncedSearchBar.length > 0) {
      fetchImages(debouncedSearchBar);
    }
  }, [debouncedSearchBar]);

  const fetchImages = useCallback(
    async (searchQuery: string) => {
      try {
        if (!cachedImages[searchQuery.trim()]) {
          const images = await searchImages(searchQuery);
          if (images) {
            setCachedImages((prevCachedImages) => ({
              ...prevCachedImages,
              [searchQuery]: images,
            }));
            localStorage.setItem(
              "history",
              JSON.stringify({
                ...cachedImages,
                [searchQuery]: images,
              })
            );
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

        <Link to="history" className="history-btn">
          <FaHistory />
          History
        </Link>
      </div>

      {cachedImages &&
        cachedImages[debouncedSearchBar] &&
        cachedImages[debouncedSearchBar].length && (
          <span className="results-span">
            Results for: {searchBar}
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
