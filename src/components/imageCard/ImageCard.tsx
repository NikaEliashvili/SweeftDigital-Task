import { useState } from "react";
import { Image } from "../../types/types";
import ImageModal from "../../modals/ImageModal";

import "./imageCard.css";

export default function ImageCard({ data }: { data: Image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={handleImageClick} className="image-card">
        <img
          width={150}
          src={data.urls.small}
          alt={data.alt_description}
        />
        <span className="user-name">By {data.user.name}</span>
      </div>
      {isModalOpen && (
        <ImageModal closeModal={closeModal} data={data} />
      )}
    </>
  );
}

ImageCard.Skeleton = () => {
  return <div className="image-skeleton"></div>;
};
