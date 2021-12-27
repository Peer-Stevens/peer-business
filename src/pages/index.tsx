import { useState } from "react";
import { SearchResult } from "../components/SearchResult";
import { useSearchPlaces } from "../hooks/useSearchPlaces";

const Index = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [zip, setZip] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { places, loading } = useSearchPlaces({
    searchText: searchTerm + " " + zip,
  });

  return (
    <>
      <div className="pt-2 relative text-gray-600 max-w-md text-left">
        <form
          onSubmit={e => {
            e.preventDefault();
            /* eslint-disable */
            // @ts-ignore
            setSearchTerm(e.target["search"].value);
            // @ts-ignore
            setZip(e.target["zip"].value);
            /* eslint-enable */
          }}
          // className="grid grid-cols-2"
        >
          <label htmlFor={"search"}>
            Name:
            <input
              className="border-2 border-gray-600 rounded-lg max-w-full w-full bg-white h-10 px-5 mb-5 text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
          </label>
          <label htmlFor={"zip"}>
            Zip Code:
            <input
              className="border-2 border-gray-600 bg-white max-w-full w-full h-10 px-5 mb-4 rounded-lg text-sm focus:outline-none"
              type="zip"
              name="zip"
              placeholder="Zip Code"
            />
          </label>
          <button
            type="submit"
            className="border-2 border-gray-600 p-2.5 rounded-md w-full hover:shadow-md transition-all text-black"
          >
            🔎 Search
          </button>
        </form>
      </div>
      {loading && <div>Loading...</div>}
      {places &&
        places.length > 0 &&
        places.map(place => <SearchResult place={place} />)}
    </>
  );
};

Index.title = "Peer Business";
Index.description = "Peer Business console";

export default Index;
