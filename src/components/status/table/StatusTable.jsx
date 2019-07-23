import React from "react";
import "./StatusTable.scss";

const StatusTable = ({ messages }) => {
  const status = ["В очереди", "Отправлено", "Ошибка"];
  return (
    <table className="statustable">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Тема</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((msg, i) => (
          <tr key={i}>
            <td>{msg.date}</td>
            <td>{msg.theme}</td>
            <td
              className={
                msg.status === 0
                  ? ""
                  : msg.status === 2
                  ? "status--failure"
                  : "status--success"
              }
            >
              {status[msg.status]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatusTable;
