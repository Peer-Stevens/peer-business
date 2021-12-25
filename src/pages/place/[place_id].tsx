import { useRouter } from "next/router";

const PlacePage = (): JSX.Element => {
  const { query } = useRouter();
  return (
    <>
      <h1>{query.place_id}</h1>
    </>
  );
};

PlacePage.title = "Place Page";
PlacePage.description = "Lorem ipsum";

export default PlacePage;
