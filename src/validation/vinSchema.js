import * as yup from "yup";

export const vinSchema = yup.object({
  vin: yup
    .string()
    .required("Поле не може бути пустим")
    .length(17, "VIN-код має містити рівно 17 символів")
    .matches(/^[A-HJ-NPR-Z0-9]*$/, "Є заборонені символи"),
});
