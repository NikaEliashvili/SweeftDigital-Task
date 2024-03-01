import { MdClose, MdPublish } from "react-icons/md";
import { RiDownloadCloudFill } from "react-icons/ri";
import { Image, Statistics } from "../types/types";

import "./imageModal.css";
import { useEffect, useState } from "react";
import getImageStatistics from "../services/getImageStatistic";
import { FaLocationDot, FaUsersViewfinder } from "react-icons/fa6";
import { FcLikePlaceholder } from "react-icons/fc";

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
  console.log(data);

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
          <img src={data.urls.full} alt="" />
        </div>
        <div className="image-details">
          <div className="details-container">
            <RiDownloadCloudFill className="icon" />
            <span className="detail">
              {formatNumbers(statistics?.downloads.total)}
            </span>
          </div>
          <div className="details-container">
            <FaUsersViewfinder className="icon" />
            <span className="detail">
              {formatNumbers(statistics?.views.total)}
            </span>
          </div>
          <div className="details-container">
            <FcLikePlaceholder className="icon" />
            <span className="detail">
              {formatNumbers(data.likes)}
            </span>
          </div>
        </div>
        <div className="desription">
          <p>{data.description}</p>
        </div>
        <div className="published">
          <p>
            <MdPublish className="icon" /> Published on {createdAt}
          </p>
        </div>
        <div className="location">
          <p>
            <FaLocationDot className="icon" />
            {data.user.location}
          </p>
        </div>
      </div>
    </>
  );
}

function formatNumbers(number?: number): string | null {
  return number?.toLocaleString() || null;
}
