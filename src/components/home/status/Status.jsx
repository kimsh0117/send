import React from "react";
import StatusTable from "./table";
import "./Status.scss";

const Status = ({ messages }) => (
  <div className="status">
    <div className="status__title">Отправленные сообщения</div>
    {messages.length === 0 ? (
      <div className="status__message">Сообщения еще не отпралялись</div>
    ) : (
      <StatusTable messages={messages} />
    )}
  </div>
);

export default Status;
