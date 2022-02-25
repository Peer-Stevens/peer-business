import { useRouter } from "next/router";
import Link from "next/link";
import { useGetPlaceById } from "../../../hooks/useGetPlaceById";

const linkClass =
  "text-black border-b-black border-b-2 hover:pb-2 hover:border-b-black";

const fieldsToNames = {
  avgGuideDogFriendly: "Guide Dog Friendliness",
  isMenuAccessibleAvg: "Menu Accessibility",
  noiseLevelAvg: "Noise Level",
  lightingAvg: "Lighting",
  isStaffHelpfulAvg: "Staff Helpfulness",
  isBathroomOnEntranceFloorAvg: "Bathroom On Entrance Floor",
  isContactlessPaymentOfferedAvg: "Contactless Payment Offered",
  isStairsRequiredAvg: "Stairs Required",
  spacingAvg: "Spacing",
};

const validRatingFields = Object.keys(fieldsToNames);

const getColorFromFromFillPct = (fillPct: number) => {
  if (fillPct < 25) {
    return "bg-red-600";
  } else if (fillPct < 50) {
    return "bg-orange-400";
  } else if (fillPct < 75) {
    return "bg-yellow-500";
  } else {
    return "bg-green-700";
  }
};

const PlacePage = (): JSX.Element | null => {
  const { query } = useRouter();
  const { data } = useGetPlaceById({
    place_id: query.place_id as string | undefined,
  });
  const place = data?.placeDetails?.result;

  if (place)
    return (
      <div className="place-page">
        <div className="place-page-header grid grid-cols-2">
          <div>
            <h1 className="font-bold text-4xl text-black">{place.name}</h1>
            <h2
              className="font-bold text-xl text-black"
              dangerouslySetInnerHTML={{
                __html: place.adr_address,
              }}
            />
          </div>
          <div>
            {place.geometry && (
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?size=768x300&markers=color:black%7C${place.geometry.location.lat},${place.geometry.location.lng}&zoom=19&key=AIzaSyDr_urYOjCyJyTzMjYmeMBNChgZAUbPoqw`}
                alt={place.name}
              />
            )}
          </div>
        </div>
        <div>
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <Link
                href={{
                  pathname: "/place/[place_id]/promotions",
                  query,
                }}
              >
                <a className={linkClass}>Promotions</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href={{
                  pathname: "/place/[place_id]/notifications",
                  query,
                }}
              >
                <a className={linkClass}>Notifications</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link
                href={{
                  pathname: "/place/[place_id]/recommendations",
                  query,
                }}
              >
                <a className={linkClass}>Recommendations</a>
              </Link>
            </li>
          </ul>
        </div>
        {data?.placeDetails?.accessibilityData &&
          Object.entries(data.placeDetails.accessibilityData)
            .filter(([key]) => validRatingFields.includes(key))
            .map(([rawAttr, rawValue]) => {
              const attr = rawAttr as keyof typeof fieldsToNames;
              const value = rawValue as number;
              const fillPct =
                attr.substring(0, 2) === "is" ? value * 100 : (value / 5) * 100;
              return (
                <>
                  <div className="grid grid-cols-2">
                    <p className="mt-3 mb-1">{fieldsToNames[attr]}</p>
                    <span className={`mt-3 mb-1 text-right`}>
                      <Link href={`/resources/${attr}`}>
                        <a
                          className={`${
                            fillPct > 0 && fillPct < 25
                              ? "text-red-600 font-bold"
                              : "text-gray-500"
                          }`}
                        >
                          resources
                        </a>
                      </Link>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 mb-3">
                    <div
                      style={{ width: String(fillPct) + "%", height: 32 }}
                      className={getColorFromFromFillPct(fillPct)}
                    ></div>
                  </div>
                </>
              );
            })}
      </div>
    );
  else return null;
};

PlacePage.title = "Place Page";
PlacePage.description = "Lorem ipsum";

export default PlacePage;
