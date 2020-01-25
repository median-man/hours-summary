import React from "react";

const Row = ({ header, data, isToday }) => {
  return (
    <tr className={isToday ? "table-primary" : ""}>
      <th className="text-capitalize">
        {header}{" "}
        {isToday && <span className="ml-2 badge badge-primary">Today!</span>}
      </th>
      <td>{data}</td>
    </tr>
  );
};

const WeekDaysTable = ({ tableData = [] }) => (
  <table className="table mt-5" style={{ maxWidth: 400 }}>
    <tbody>
      {tableData.map(rowData => (
        <Row key={rowData.header} {...rowData} />
      ))}
    </tbody>
  </table>
);

export default WeekDaysTable;
