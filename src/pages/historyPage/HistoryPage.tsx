import HistoryTerm from "../../components/HistoryTerm/HistoryTerm";
import "./historyPage.css";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  // const [history, setHistory] = useState<{
  //   [query: string]: Image[];
  // }>(JSON.parse(localStorage.getItem("history") as string) || {});

  const history =
    JSON.parse(localStorage.getItem("history") as string) || {};
  return (
    <div className="history-page">
      <h1 className="title">Search History</h1>
      <Link to="/" className="back-home-btn">
        <TiArrowBack />
        <span>Home</span>
      </Link>
      <div className="all-terms">
        {Object.keys(history).length > 0 ? (
          Object.keys(history).map((query, i) => (
            <HistoryTerm
              key={i + 1}
              searchedQuery={query}
              searchedImages={history[query]}
            />
          ))
        ) : (
          <p className="no-history">No history found... </p>
        )}
      </div>
    </div>
  );
}
