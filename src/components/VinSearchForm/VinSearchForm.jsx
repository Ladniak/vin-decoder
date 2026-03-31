import { useState } from "react";
import { toast } from "react-toastify";
import { vinSchema } from "../../validation/vinSchema";

import module from "./VinSearchForm.module.css";

const VinSearchForm = ({ onSearch, isLoading }) => {
  const [vin, setVin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanVin = vin.trim().toUpperCase();

    try {
      await vinSchema.validate({ vin: cleanVin });
      onSearch(cleanVin);
      setVin("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form className={module.searchBox} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введіть 17-значний VIN-код..."
        className={module.input}
        value={vin}
        onChange={(e) => {
          setVin(e.target.value.toUpperCase());
          if (e.target.value.length > 0) toast.dismiss();
        }}
        maxLength={17}
        disabled={isLoading}
      />
      <button
        type="submit"
        className={module.searchButton}
        disabled={isLoading}
      >
        {isLoading ? "Пошук..." : "Перевірити"}
      </button>
    </form>
  );
};

export default VinSearchForm;
