import type { Place } from "@googlemaps/google-maps-services-js";

export type PlaceWithAccesibilityData = Place & {
  accessibilityData?: {
    _id: string;
    avgBraille: number;
    avgFontReadability: number;
    avgNavigability: number;
    avgStaffHelpfulness: number;
    avgGuideDogFriendly: number;
  };
};
