import useSWR, { SWRResponse } from "swr";
import { fetcher } from "../utils/fetcher";
import type { PlaceWithA11yData } from "peer-types";

export type PlaceDetailsResponse = {
  placeDetails: PlaceWithA11yData;
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
