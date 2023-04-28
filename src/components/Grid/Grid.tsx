import { useRef } from "react";
import { TableData } from "../../shared/models";
import "./Grid.css";
import { useForm } from "react-hook-form";

const Grid = (props: { source: TableData[]; passData: any }) => {
  const { source } = props;
  const table = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<any>({ mode: "onChange" });

  const onSubmit = (formData: any) => {
    const { limit, today } = formData;
    props.passData(table.current, limit, today);
  };

  return (
    <>
      <div className="inputs-and-button-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="limit-wrapper">
            <b>Limit</b>
            <input
              type="number"
              min="1"
              {...register(`limit`, {
                required: true,
              })}
            />
          </div>
          <div className="today-wrapper">
            <b>Today</b>
            <input
              type="date"
              id="today"
              {...register(`today`, {
                required: true,
              })}
            ></input>
          </div>
          <input
            type="submit"
            value="Calculate"
            disabled={!isDirty || !isValid}
            className={`submit-btn ${
              !isDirty || !isValid ? "submit-btn-disable" : "submit-btn-enable "
            }`}
          />
        </form>
      </div>
      <table ref={table}>
        <tbody>
          <tr className="header">
            <th>name</th>
            <th>mailReceivedDate</th>
            <th>solutionSentDate</th>
            <th>isRed</th>
          </tr>
          {source.map((sourceItem) => (
            <tr
              key={`${sourceItem.name}-${sourceItem.mailReceivedDate}`}
              className={
                sourceItem.isBackgroundColorRed ? "red-background" : ""
              }
            >
              <td>{sourceItem.name}</td>
              <td>{sourceItem.mailReceivedDate}</td>
              <td>{sourceItem.solutionSentDate}</td>
              <td className="background-info-column">
                {sourceItem.isBackgroundColorRed ? 1 : 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Grid;
