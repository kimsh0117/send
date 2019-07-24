import React from "react";
import "./SendingTable.scss";

const SendingTable = ({ messages }) => {
  const status = ["В очереди", "Отправлено", "Ошибка"];
  return (
    <table className="sending__table">
      <thead className="sending__table__thead">
        <tr className="sending__table__thead__tr">
          <th className="sending__table__thead__tr__th">Дата</th>
          <th className="sending__table__thead__tr__th">Тема</th>
          <th className="sending__table__thead__tr__th">Статус</th>
        </tr>
      </thead>
      <tbody className="sending__table__tbody">
        {messages.map((msg, i) => (
          <tr className="sending__table__tbody__tr" key={i}>
            <td className="sending__table__tbody__tr__td">{msg.date}</td>
            <td className="sending__table__tbody__tr__td">{msg.theme}</td>
            <td
              className={
                msg.status === 0
                  ? "sending__table__tbody__tr__td"
                  : msg.status === 2
                  ? "sending__table__tbody__tr__td--failure"
                  : "sending__table__tbody__tr__td--success"
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

export default SendingTable;
