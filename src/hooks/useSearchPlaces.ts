import { useEffect, useState } from "react";
import { PlaceWithAccessibilityData } from "peer-types";

export const useSearchPlaces = ({
  searchText,
}: {
  searchText: string;
}): {
  places: PlaceWithAccessibilityData[];
  loading: boolean;
  error: string | null;
} => {
  const [places, setPlaces] = useState<PlaceWithAccessibilityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    if (searchText.trim().length > 0) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/searchPlaces?search=${searchText
            .trim()
            .replaceAll(" ", "+")}&includeRatings=true`
        );
        const data = (await response.json()) as {
          places: PlaceWithAccessibilityData[];
        };
        setPlaces(data.places);
      } catch (error) {
        setError(JSON.stringify(error));
      }
      setLoading(false);
    } else {
      setError("Please enter a search term");
    }
  };

  useEffect(() => {
    void search();
  }, [searchText]);

  return {
    places,
    loading,
    error,
  };
};
