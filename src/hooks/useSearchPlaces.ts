import { useEffect, useState } from "react";
import type { PlaceWithAccessibilityData } from "peer-types";
import { Place } from "@googlemaps/google-maps-services-js";

export type PlaceSearchResponse = {
  formatted_address: string;
  geometry: Place["geometry"];
  name: string;
  place_id: string;
  accessibilityData: PlaceWithAccessibilityData["accessibilityData"];
};

export const useSearchPlaces = ({
  searchText,
}: {
  searchText: string;
}): {
  places: PlaceSearchResponse[];
  loading: boolean;
  error: string | null;
} => {
  const [places, setPlaces] = useState<PlaceSearchResponse[]>([]);
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
          places: PlaceSearchResponse[];
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
