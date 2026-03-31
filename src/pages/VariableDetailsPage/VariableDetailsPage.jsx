import { useParams, useNavigate } from "react-router-dom";
import { useGetVariablesQuery } from "../../redux/vinApi";

import module from "./VariableDetailsPage.module.css";

const VariableDetailsPage = () => {
  const { variableId } = useParams();
  const navigate = useNavigate();
  const { data: variables } = useGetVariablesQuery();

  const variable = variables?.find((v) => v.ID.toString() === variableId);

  if (!variable) return <p>Змінну не знайдено</p>;

  return (
    <div className={module.container}>
      <button onClick={() => navigate(-1)} className={module.backBtn}>
        Назад до списку
      </button>
      <article className={module.card}>
        <span className={module.badge}>ID: {variable.ID}</span>
        <h1 className={module.name}>{variable.Name}</h1>
        <div
          className={module.description}
          dangerouslySetInnerHTML={{ __html: variable.Description }}
        />
      </article>
    </div>
  );
};

export default VariableDetailsPage;
