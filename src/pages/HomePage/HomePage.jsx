import module from "./HomePage.module.css";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { vinSchema } from "../../validation/vinSchema";

const HomePage = () => {
  const [vin, setVin] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      await vinSchema.validate({ vin });
      console.log("Searching for VIN:", vin);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className={module.container}>
        <section className={module.hero}>
          <div className={module.overlay}>
            <h1 className={module.title}>
              Миттєва перевірка авто за{" "}
              <span className={module.accent}>VIN-кодом</span>
            </h1>
            <p className={module.subtitle}>
              Отримайте повну історію автомобіля: ДТП, пробіг, ремонти та
              юридичний статус за 1 хвилину.
            </p>

            <form className={module.searchBox} onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Введіть 17-значний VIN-код..."
                className={module.input}
                value={vin}
                onChange={(e) => {
                  setVin(e.target.value.toUpperCase());
                  toast.dismiss();
                }}
                maxLength={17}
              />
              <button type="submit" className={module.searchButton}>
                Перевірити
              </button>
            </form>
            <p className={module.hint}>Наприклад: 1FA6P8CF7G5XXXXXX</p>
          </div>
        </section>

        <section className={module.infoSection}>
          <div className={module.grid}>
            <div className={module.card}>
              <div className={module.icon}>
                <svg>
                  <use href="/symbol-defs.svg#icon-notepad"></use>
                </svg>
              </div>
              <h3>Що таке VIN?</h3>
              <p>
                Це унікальний 17-значний код, "ДНК" вашого авто. Він містить
                дані про виробника, характеристики та рік випуску моделі.
              </p>
            </div>

            <div className={module.card}>
              <div className={module.icon}>
                <svg>
                  <use href="/symbol-defs.svg#icon-shield"></use>
                </svg>
              </div>
              <h3>Навіщо перевіряти?</h3>
              <p>
                Щоб не купити "кота в мішку". Ми перевіряємо бази на предмет
                викрадень, арештів, реального пробігу та участі в ДТП.
              </p>
            </div>

            <div className={module.card}>
              <div className={module.icon}>
                <svg>
                  <use href="/symbol-defs.svg#icon-thunder"></use>
                </svg>
              </div>
              <h3>Як це працює?</h3>
              <p>
                Просто введіть код у поле вище. Наша система миттєво опрацює
                запит через офіційні реєстри та надасть вам звіт.
              </p>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
