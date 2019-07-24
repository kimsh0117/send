import React from "react";
import SendingTable from "./table";
import "./Sending.scss";

const Sending = ({ messages }) => (
  <div className="sending">
    <div className="sending__title">Отправленные сообщения</div>
    {messages.length === 0 ? (
      <div className="sending__message">Сообщения еще не отпралялись</div>
    ) : (
      <SendingTable messages={messages} />
    )}
  </div>
);

export default Sending;
