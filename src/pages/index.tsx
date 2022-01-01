import { useState } from "react";
import { SearchResult } from "../components/SearchResult";
import { useSearchPlaces } from "../hooks/useSearchPlaces";

const Index = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { places, loading } = useSearchPlaces({
    searchText: searchTerm,
  });

  return (
    <>
      <div className="pt-2 relative text-gray-600 max-w-md text-left">
        <form
          onSubmit={e => {
            e.preventDefault();
            /* eslint-disable */
            // @ts-ignore
            const formValues = e.target as {
              search: HTMLInputElement,
              zip: HTMLInputElement,
              street: HTMLInputElement,
              city: HTMLInputElement,
              state: HTMLInputElement,
            }
            setSearchTerm(
              formValues["search"].value + " " +
              formValues["street"].value + ", " +
              formValues["city"].value + ", " +
              formValues["state"].value + " " +
              formValues["zip"].value
            )
            /* eslint-enable */
          }}
          className="grid grid-cols-2"
        >
          <label htmlFor={"search"} className="col-span-2">
            Name:
            <input
              className="border-2 border-gray-600 rounded-lg max-w-full w-full bg-white h-10 px-5 mb-5 text-sm focus:outline-none"
              type="text"
              name="search"
              placeholder="Search"
            />
          </label>
          <label htmlFor={"street"} className="mr-2">
            Street Address:
            <input
              className="border-2 border-gray-600 bg-white max-w-full w-full h-10 px-5 mb-4 rounded-lg text-sm focus:outline-none"
              type="text"
              name="street"
              placeholder="Street Address"
            />
          </label>
          <label htmlFor={"city"}>
            City:
            <input
              className="border-2 border-gray-600 bg-white max-w-full w-full h-10 px-5 mb-4 rounded-lg text-sm focus:outline-none"
              type="text"
              name="city"
              placeholder="City"
            />
          </label>
          <label htmlFor={"state"} className="mr-2">
            State
            <input
              className="border-2 border-gray-600 bg-white max-w-full w-full h-10 px-5 mb-4 rounded-lg text-sm focus:outline-none"
              type="text"
              name="state"
              placeholder="State (abbr.)"
              maxLength={2}
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
            className="border-2 border-gray-600 p-2.5 rounded-md w-full col-span-2 hover:shadow-md transition-all text-black"
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
