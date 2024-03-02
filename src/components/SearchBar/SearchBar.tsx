import { IoSearch } from "react-icons/io5";
import "./searchBar.css";
export default function SearchBar({
  value,
  handleChange,
  name,
}: {
  value: string | null;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search images..."
        className="searchbar-input"
        name={name}
        value={value || ""}
        onChange={handleChange}
      />
      <IoSearch className="searchbar-icon" />
    </div>
  );
}
