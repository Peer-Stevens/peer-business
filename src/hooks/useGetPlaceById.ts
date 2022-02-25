import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useGetPlaceById = ({
  place_id,
}: {
  place_id: string | undefined;
}) => {
  return useSWR<
    { placeDetails: { results: any; accessibilityData: any } }, // TODO change to correct types when packag is available
    any
  >(
    place_id &&
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getPlaceDetails/${place_id}?includeRatings=true`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
};
