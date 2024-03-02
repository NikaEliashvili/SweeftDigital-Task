import { useState } from "react";
import { Image } from "../../types/types";
import ImageCard from "../imageCard/ImageCard";
import "./historyTerm.css";
import { FaCaretDown } from "react-icons/fa6";

export default function HistoryTerm({
  searchedQuery,
  searchedImages,
}: {
  searchedImages: Image[];
  searchedQuery: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="term-container">
      <div className="term" onClick={toggle}>
        <span>{searchedQuery}</span>
        <span>
          <FaCaretDown
            className={
              isOpen ? "dropdown-icon rotate" : "dropdown-icon"
            }
          />
        </span>
      </div>
      {isOpen && (
        <div className="images">
          {searchedImages.map((image) => (
            <ImageCard data={image} key={image.id} />
          ))}
        </div>
      )}
    </div>
  );
}
