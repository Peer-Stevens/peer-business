import Link from "next/link";
import { useRouter } from "next/router";
import { ReactChild } from "react";

type PlaceSubpaths = "promotions" | "recommendations" | "notifications";

const linkClass =
  "text-black border-b-black border-b-2 hover:pb-2 hover:border-b-black";

export const PlacePageLayout: React.FC<{
  place: any;
}> = ({ place, children }) => {
  const router = useRouter();

  console.log(router.pathname);

  const NavLink = ({ path, text }: { path: PlaceSubpaths; text: string }) =>
    router.pathname.includes(path) ? (
      <p className="border-2 p-1 border-black">{text}</p>
    ) : (
      <Link
        href={{
          pathname: "/place/[place_id]/" + path,
          query: {
            place_id: place.place_id,
          },
        }}
      >
        <a className={linkClass}>Promotions</a>
      </Link>
    );

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
            <NavLink path="promotions" text="Promotions" />
          </li>
          <li className="mr-6">
            <NavLink path="notifications" text="Notifications" />
          </li>
          <li className="mr-6">
            <NavLink path="recommendations" text="Recommendations" />
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};
