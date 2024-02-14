import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  return (
    <form className="relative border-red-500 w-40">
      <input
        type="text"
        aria-label="search"
        className="py-1 px-2 rounded-full text-sm text-black w-full"
      />
      <button className="absolute right-2 text-sky-700">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 " />
      </button>
    </form>
  );
}

export default Search;
