import { useGetVariablesQuery } from "../../redux/vinApi";
import { Link } from "react-router-dom";
import module from "./VariablesPage.module.css";

const VariablesPage = () => {
  const { data: variables, isLoading, error } = useGetVariablesQuery();

  if (isLoading)
    return <p className={module.loading}>Завантаження довідника...</p>;
  if (error) return <p className={module.error}>Помилка завантаження даних</p>;

  return (
    <div className={module.container}>
      <h1 className={module.title}>Довідник змінних VIN</h1>
      <ul className={module.list}>
        {variables.map((v) => (
          <li key={v.ID} className={module.item}>
            <Link to={`/variables/${v.ID}`} className={module.link}>
              <span className={module.id}>#{v.ID}</span>
              <span className={module.name}>{v.Name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariablesPage;
