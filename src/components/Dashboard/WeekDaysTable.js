import React from "react";

const WeekDaysTable = () => (
  <table className="table mt-5" style={{ maxWidth: 400 }}>
    <tbody>
      <tr>
        <th>Sunday</th>
        <td>1.00</td>
      </tr>
      <tr>
        <th>Monday</th>
        <td>4.15</td>
      </tr>
      <tr>
        <th>Tuesday</th>
        <td>8.70</td>
      </tr>
      <tr>
        <th>Wednesday</th>
        <td>7.42</td>
      </tr>
      <tr>
        <th>Thursday</th>
        <td>7.17</td>
      </tr>
      <tr>
        <th>Friday</th>
        <td>0.68</td>
      </tr>
      <tr className="table-primary">
        <th>
          Saturday <span className="badge badge-primary">Today!</span>
        </th>
        <td>0.00</td>
      </tr>
    </tbody>
  </table>
);

export default WeekDaysTable;
