import { useState } from "react";
import "./App.css";
import Grid from "./components/Grid/Grid";
import dataList from "./data.json";

const ONE_DAY_AS_MS = 1000 * 60 * 60 * 24;
interface HTMLTable {
  name: string;
  mailReceivedDate: string;
  solutionSentDate: string;
  isRed: string;
}

const App = () => {
  const [count, setCount] = useState(0);
  let sourceProp = dataList;
  let tableData: HTMLTable[] = [];

  const calculate = (table: any, limit: number, today: string) => {
    parseHTMLTableElement(table);
    control(new Date(today), limit);
  };

  const parseHTMLTableElement = (table: any) => {
    tableData = [];
    const header: any[] = [];

    const cells = [...table.rows[0].cells]; // Convert htmlCollection to array
    cells.forEach((cell: any) => {
      header.push(cell.innerHTML);
    });

    const rowsArray = [...table.rows]; // Convert htmlCollection to array
    rowsArray.forEach((rowItem: any, index: number) => {
      const row: any = {};
      const cellsArray = [...rowItem.cells]; // Convert htmlCollection to array
      cellsArray.forEach((cell: any, index: number) => {
        row[header[index]] = cell.innerHTML;
      });
      if (isNotHeader(index)) {
        tableData.push(row);
      }
    });
  };

  const isNotHeader = (index: number): boolean => {
    return index !== 0;
  };

  const control = (today: Date, limit: number) => {
    let updatedCount = 0;
    const todayAsMs = today.getTime();
    const limitAsMs = ONE_DAY_AS_MS * limit;

    tableData.forEach((row) => {
      const solutionSentDateAsMs = row.solutionSentDate
        ? new Date(row.solutionSentDate).getTime()
        : todayAsMs;
      const diffAsMs =
        solutionSentDateAsMs - new Date(row.mailReceivedDate).getTime();
      if (
        (diffAsMs > limitAsMs && !+row.isRed) ||
        (diffAsMs <= limitAsMs && +row.isRed)
      ) {
        updatedCount++;
      }
    });
    setCount(updatedCount);
  };

  return (
    <div>
      <h1>Dgpays Case Study </h1>
      <Grid source={sourceProp} passData={calculate} />
      <div className="wrong-row-count">
        <b>Wrong Row Count: </b>
        {count}
      </div>
    </div>
  );
};

export default App;
