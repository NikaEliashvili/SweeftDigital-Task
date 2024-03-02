import { useState } from "react";
import HistoryTerm from "../../components/HistoryTerm/HistoryTerm";
import "./historyPage.css";
import { Image } from "../../types/types";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [history, setHistory] = useState<{
    [query: string]: Image[];
  }>(JSON.parse(localStorage.getItem("history") as string) || {});

  return (
    <div className="history-page">
      <h1 className="title">History Page</h1>
      <Link to="/" className="back-home-btn">
        <TiArrowBack />
        <span>Home</span>
      </Link>
      <div className="all-terms">
        {Object.keys(history).map((query, i) => (
          <HistoryTerm
            key={i + 1}
            searchedQuery={query}
            searchedImages={history[query]}
          />
        ))}
      </div>
    </div>
  );
}
