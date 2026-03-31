import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useLazyDecodeVinQuery } from "../../redux/vinApi";
import { addToHistory } from "../../redux/slice";

import VinSearchForm from "../../components/VinSearchForm/VinSearchForm";

import module from "./HomePage.module.css";

import { Link } from "react-router";
import { useSearchParams } from "react-router";

const HomePage = () => {
  const dispatch = useDispatch();

  const [currentVin, setCurrentVin] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const vinFromUrl = searchParams.get("vin");
  const history = useSelector((state) => state.history.items);

  const [trigger, { data, isLoading, isFetching }] = useLazyDecodeVinQuery();

  useEffect(() => {
    if (vinFromUrl) {
      trigger(vinFromUrl);
      setCurrentVin(vinFromUrl);
    }
  }, [vinFromUrl, trigger]);

  const handleProcessSearch = async (vinCode) => {
    setSearchParams({ vin: vinCode });
    try {
      const result = await trigger(vinCode).unwrap();
      setCurrentVin(vinCode);

      dispatch(addToHistory(vinCode));

      if (result.message) {
        toast.info(result.message);
      }
    } catch (err) {
      toast.error(err.data?.Message || "Помилка при отриманні даних");
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
              Отримайте повну історію автомобіля: характеристики, виробника та
              рік випуску за 1 хвилину.
            </p>

            <VinSearchForm
              onSearch={handleProcessSearch}
              isLoading={isLoading || isFetching}
            />

            {history.length > 0 && (
              <div className={module.historyWrapper}>
                <span className={module.hint}>Останні запити:</span>
                <div className={module.historyButtons}>
                  {history.map((item) => (
                    <button
                      key={item}
                      className={module.historyItem}
                      type="button"
                      onClick={() => handleProcessSearch(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                Це унікальний 17-значний код, що містить дані про виробника та
                характеристики авто.
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
                Щоб дізнатися технічні параметри та офіційні дані про
                транспортний засіб.
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
                Введіть код, і система підтягне дані з офіційного реєстру NHTSA.
              </p>
            </div>
          </div>
        </section>

        {data && (
          <section className={module.resultsSection}>
            <h2 className={module.resultsTitle}>
              Результати для{" "}
              <span className={module.accenth2}>{currentVin}</span>{" "}
            </h2>
            <div className={module.resultsGrid}>
              {data.results.map((res, index) => (
                <div
                  key={`${res.VariableId}-${index}`}
                  className={module.resultCard}
                >
                  <Link
                    to={`/variables/${res.VariableId}`}
                    className={module.variableName}
                    title="Переглянути опис змінної"
                  >
                    {res.Variable}:
                  </Link>
                  <span className={module.variableValue}> {res.Value}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default HomePage;
