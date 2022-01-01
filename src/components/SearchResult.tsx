import React from "react";
import type { PlaceWithAccesibilityData } from "../types/place";
import Link from "next/link";

export const SearchResult: React.FC<{ place: PlaceWithAccesibilityData }> = ({
  place,
}) => {
  return (
    <Link href={`/place/${place.place_id!}`} key={place.place_id}>
      <div className="border-2 border-black my-4 flex cursor-pointer hover:shadow-md">
        {place.geometry && (
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?size=500x500&markers=color:black%7C${place.geometry.location.lat},${place.geometry.location.lng}&zoom=19&key=AIzaSyDr_urYOjCyJyTzMjYmeMBNChgZAUbPoqw`}
            alt={place.name}
            style={{ width: "300px" }}
          />
        )}
        <div className="ml-4">
          <p className="font-semibold">{place.name}</p>
          <p>{place.formatted_address}</p>
          <p>Click here for more details ⏩</p>
        </div>
      </div>
    </Link>
  );
};
