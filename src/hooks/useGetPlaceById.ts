import useSWR, { SWRResponse } from "swr";
import { fetcher } from "../utils/fetcher";
import type { PlaceWithAccessibilityData } from "peer-types";
import { PlaceData } from "@googlemaps/google-maps-services-js";

export type PlaceDetailsResponse = {
  placeDetails: {
    result: PlaceData;
    accessibilityData: PlaceWithAccessibilityData["accessibilityData"];
  };
};

export const useGetPlaceById = ({
  place_id,
}: {
  place_id: string | undefined;
}): SWRResponse<PlaceDetailsResponse, string> => {
  return useSWR<PlaceDetailsResponse, string>(
    place_id &&
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getPlaceDetails/${place_id}?includeRatings=true`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
};
