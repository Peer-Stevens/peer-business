import { useEffect, useState } from "react";
import type { PlaceWithAccesibilityData } from "../types/place";

export const useSearchPlaces = ({
  searchText,
}: {
  searchText: string;
}): {
  places: PlaceWithAccesibilityData[];
  loading: boolean;
  error: string | null;
} => {
  const [places, setPlaces] = useState<PlaceWithAccesibilityData[]>([]);
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
          places: PlaceWithAccesibilityData[];
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
