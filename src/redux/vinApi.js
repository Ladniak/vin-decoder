import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vinApi = createApi({
  reducerPath: "vinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vpic.nhtsa.dot.gov/api/vehicles/",
  }),
  endpoints: (builder) => ({
    decodeVin: builder.query({
      query: (vin) => `decodevin/${vin}?format=json`,
      transformResponse: (response) => {
        const junkValues = ["Not Applicable", "None", "0", "N/A"];
        return {
          results: response.Results.filter(
            (item) =>
              item.Value &&
              item.Value.trim() !== "" &&
              !junkValues.includes(item.Value),
          ),
          message: response.Message,
        };
      },
    }),
    getVariables: builder.query({
      query: () => `getvehiclevariablelist?format=json`,
      transformResponse: (response) => response.Results,
    }),
  }),
});

export const { useLazyDecodeVinQuery, useGetVariablesQuery } = vinApi;
