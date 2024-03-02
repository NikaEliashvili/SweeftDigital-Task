import { MdClose, MdPublish } from "react-icons/md";
import { RiDownloadCloudFill } from "react-icons/ri";
import { Image, Statistics } from "../types/types";

import "./imageModal.css";
import { useEffect, useState } from "react";
import getImageStatistics from "../services/getImageStatistic";
import { FaLocationDot, FaUsersViewfinder } from "react-icons/fa6";
import { FcLikePlaceholder } from "react-icons/fc";

import LoadingSpiner from "../components/LoadingSpin/LoadingSpiner";

export default function ImageModal({
  closeModal,
  data,
}: {
  closeModal: () => void;
  data: Image;
}) {
  const [statistics, setStatistics] = useState<Statistics | null>(
    null
  );

  const date = new Date(data.created_at);
  const createdAt = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const response = await getImageStatistics(data.id);
        setStatistics(response);
      } catch (err) {
        console.log(err);
      }
    };
    loadStatistics();
  }, []);

  return (
    <>
      <div className="modal-bg" onClick={closeModal}></div>
      <div className="modal">
        <div className="sticky-container">
          <div className="user-info">
            <div className="user-profile-img">
              <img src={data.user.profile_image.small} alt="" />
            </div>
            <div className="user-profile-names">
              <p className="full-name">{data.user.name}</p>
              <span className="username">@{data.user.username}</span>
            </div>
          </div>
          <button onClick={closeModal} className="close-btn">
            <MdClose />
          </button>
        </div>
        <div className="original-image">
          <img
            alt={data.alt_description}
            srcSet={`${data.urls.small} 400w, ${data.urls.regular} 800w, ${data.urls.full} 1200w`}
          />
        </div>
        <div className="image-details">
          {statistics?.downloads.total ||
          statistics?.downloads.total === 0 ? (
            <div className="details-container">
              <abbr title="Downloads" className="details-container">
                <RiDownloadCloudFill className="icon" />
                <span className="detail">
                  {formatNumbers(statistics.downloads.total)}
                </span>
              </abbr>
            </div>
          ) : (
            <LoadingSpiner />
          )}
          {statistics?.views.total ||
          statistics?.views.total === 0 ? (
            <div className="details-container">
              <abbr title="Views" className="details-container">
                <FaUsersViewfinder className="icon" />
                <span className="detail">
                  {formatNumbers(statistics.views.total)}
                </span>
              </abbr>
            </div>
          ) : (
            <LoadingSpiner />
          )}
          {data.likes || data.likes === 0 ? (
            <div className="details-container">
              <abbr title="Likes" className="details-container">
                <FcLikePlaceholder className="icon" />
                <span className="detail">
                  {formatNumbers(data.likes)}
                </span>
              </abbr>
            </div>
          ) : (
            <LoadingSpiner />
          )}
        </div>
        <div className="desription">
          {data.description && <p>{data.description}</p>}
        </div>
        {createdAt && (
          <div className="published">
            <p>
              <MdPublish className="icon" /> Published on {createdAt}
            </p>
          </div>
        )}
        {data.user.location && (
          <div className="location">
            <p>
              <FaLocationDot className="icon" />
              {data.user.location}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function formatNumbers(number?: number): string | null {
  return number?.toLocaleString() || null;
}
