import React from "react";
import { clip } from "assets/img";
import { Button } from "components/common";
import "./Sending.scss";

const Sending = ({ changeInput, validationCheck, valCheckMsg }) => (
  <div className="sending">
    <div className="sending__title">Отправлялка сообщений</div>
    <div className="sending__from">
      <label>От кого</label>
      <div className="inputs">
        <input
          type="text"
          id="namefrom"
          placeholder="Имя"
          className="inputs__name"
          onChange={e => changeInput(0, e)}
          onBlur={e => validationCheck(0, e)}
        />
        <input
          type="email"
          id="emailfrom"
          placeholder="Email"
          className="inputs__email"
          onChange={e => changeInput(1, e)}
          onBlur={e => validationCheck(1, e)}
        />
      </div>
      <div className="errMsg">
        <p>{valCheckMsg[0]}</p>
        <p>{valCheckMsg[1]}</p>
      </div>
    </div>
    <div className="sending__for">
      <label>Кому</label>
      <div className="inputs">
        <input
          type="text"
          id="namefor"
          placeholder="Имя"
          className="inputs__name"
          onChange={e => changeInput(0, e)}
          onBlur={e => validationCheck(0, e)}
        />
        <input
          type="email"
          id="emailfor"
          placeholder="Email"
          className="inputs__email"
          onChange={e => changeInput(1, e)}
          onBlur={e => validationCheck(1, e)}
        />
      </div>
    </div>
    <div className="sending__theme">
      <label>Тема письма</label>
      <div className="inputs">
        <input
          type="text"
          id="theme"
          placeholder="Тема письма"
          className="inputs__theme"
          onChange={e => changeInput(2, e)}
          onBlur={e => validationCheck(2, e)}
        />
      </div>
    </div>
    <div className="sending__message">
      <label>Сообщение</label>
      <textarea
        id="content"
        className="inputs__message"
        required
        cols="117"
        onChange={e => changeInput(3, e)}
        onBlur={e => validationCheck(3, e)}
      />
    </div>
    <div className="sending__attachment">
      <img src={clip} alt="clip" />
      <span>Прикрепить файл</span>
    </div>
    <Button>Отправить</Button>
  </div>
);

export default Sending;
