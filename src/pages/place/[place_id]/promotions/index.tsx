import { useGetPlaceById } from "../../../../hooks/useGetPlaceById";
import { PlacePageLayout } from "../../../../layout/PlacePageLayout";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

type FormFieldTypes = {
  max_cpc: { value: string };
  monthly_budget: { value: string };
  fullname: { value: string };
  ccn: { value: string };
  zipcode: { value: string };
  cvv: { value: string };
};

const inputStyle =
  "border-2 border-gray-600 bg-white max-w-full w-full h-10 px-5 mb-4 rounded-lg text-sm focus:outline-none";

const borderStyle = ""; //"border-dashed border-2 border-gray-800 rounded-xl p-2";

const PlacePromotionPage = (): JSX.Element | null => {
  const { query } = useRouter();
  const [message, setMessage] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  const { data } = useGetPlaceById({
    place_id: query.place_id as string | undefined,
  });

  const placeA11yData = data?.placeDetails.accessibilityData;

  const submitPromotion = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const target = e.target as typeof e.target & FormFieldTypes;
    if (
      !(
        target["max_cpc"].value &&
        target["monthly_budget"].value &&
        target["fullname"].value &&
        target["ccn"].value &&
        target["zipcode"].value &&
        target["cvv"].value
      )
    ) {
      setMessage({ message: "Please fill out all fields.", type: "error" });
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/promotePlace`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            place_id: query.place_id as string | undefined,
            max_cpc: target["max_cpc"].value,
            monthly_budget: target["monthly_budget"].value,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add promotion");
      }

      setMessage({
        message: "Your promotion was succesfully purchased!",
        type: "success",
      });
    } catch (error) {
      setMessage({ message: JSON.stringify(error), type: "error" });
    }
  };

  if (placeA11yData) {
    if (message.type === "success") {
      return (
        <PlacePageLayout place={data}>
          <h2 className="text-black font-bold rounded-md bg-green-400 p-2">
            You purchased a promotion for {data?.placeDetails.name}!
          </h2>
        </PlacePageLayout>
      );
    } else {
      return (
        <PlacePageLayout place={data}>
          <h2 className="text-black font-bold">
            Promote your Restaurant on Peer
          </h2>
          <ul className="text-sm text-black list-disc">
            <li>
              Set up a promotion using this form to prioritize your place in the
              list of nearby places shown to users. You will only be charged if
              your place is promoted and a customer taps on it in the app.
            </li>
            <li>
              <strong>
                Your promotion will be paused if your restaurant's average
                rating drops below 4.0.{" "}
              </strong>
              When paused, your restaurant will not be promoted and your account
              will not be charged.
            </li>
            <li>
              You will only be charged the minimum price to out-spend
              surrounding places. For example, if you bid $1.50 per click and
              the next highgest bid is $1.00, you will only be charged $1.01 per
              click.
            </li>
          </ul>
          {message.type === "error" && (
            <h2 className="text-black font-bold rounded-md bg-red-400 p-2">
              {message.message}
            </h2>
          )}
          <form className="text-black" onSubmit={submitPromotion}>
            <h4 className="font-semibold border-b-2 border-dashed border-gray-800 mb-2">
              Promotion Details
            </h4>
            <div className={borderStyle}>
              <label htmlFor="max_cpc">
                Maximum Payment per Click ($)
                <p className="text-sm">
                  See details on how you will be charged in the section above.
                </p>
                <input name="max_cpc" type="number" className={inputStyle} />
              </label>
              <label htmlFor="monthly_budget">
                Maximum Monthly Budget ($)
                <p className="text-sm">
                  Each calendar month, your promotion will be paused after you
                  are charged up to the spend limit.
                </p>
                <input
                  name="monthly_budget"
                  type="number"
                  className={inputStyle}
                />
              </label>
            </div>

            <h4 className="mt-4 font-semibold border-b-2 border-dashed border-gray-800 mb-2">
              Payment Information
            </h4>
            <div className={"grid grid-cols-2 " + borderStyle}>
              <label htmlFor="fullname" className="col-span-2">
                Full name
                <input name="fullname" type="text" className={inputStyle} />
              </label>
              <label htmlFor="ccn" className="col-span-2">
                Credit Card Number
                <input
                  id="ccn"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9\s]{13,19}"
                  autoComplete="cc-number"
                  maxLength={19}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className={inputStyle}
                />
              </label>
              <label htmlFor="zipcode" className="mr-2">
                Zip Code
                <input name="zipcode" type="text" className={inputStyle} />
              </label>
              <label htmlFor="cvv">
                Security Code (CVV)
                <input name="cvv" type="text" className={inputStyle} />
              </label>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="border-2 border-black p-2 inline-block mb-10 hover:bg-black hover:text-white"
              >
                Purchase Promotion
              </button>
            </div>
          </form>
        </PlacePageLayout>
      );
    }
  } else return null;
};

PlacePromotionPage.title = "Place Page";
PlacePromotionPage.description = "Lorem ipsum";

export default PlacePromotionPage;
