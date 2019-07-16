import React from "react";
import { clip, clipbig, trash } from "assets/img";
import { Button } from "components/common";
import "./Form.scss";

const Form = ({
  changeInput,
  validationCheck,
  valCheckMsg,
  checkAll,
  send,
  fileUploadClick,
  attaches,
  fileDelete,
  dropRef,
  dragging
}) => {
  return (
    <div className="form" ref={dropRef}>
      <div className={dragging ? "form__dropzone" : "disabled"}>
        <p className="form__dropzone__text">Бросайте файлы сюда, я ловлю</p>
        <span className="form__dropzone__sub-text">
          Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и
          zip-архивы. Размеры файла до 5 МБ
        </span>
      </div>
      <div className="form__title">Отправлялка сообщений</div>
      <div className="form__from">
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
      <div className="form__for">
        <label>Кому</label>
        <div className="inputs">
          <input
            type="text"
            id="namefor"
            placeholder="Имя"
            className="inputs__name"
            onChange={e => changeInput(2, e)}
            onBlur={e => validationCheck(2, e)}
          />
          <input
            type="email"
            id="emailfor"
            placeholder="Email"
            className="inputs__email"
            onChange={e => changeInput(3, e)}
            onBlur={e => validationCheck(3, e)}
          />
        </div>
        <div className="errMsg">
          <p>{valCheckMsg[2]}</p>
          <p>{valCheckMsg[3]}</p>
        </div>
      </div>
      <div className="form__theme">
        <label>Тема письма</label>
        <div className="inputs">
          <input
            type="text"
            id="theme"
            placeholder="Тема письма"
            className="inputs__theme"
            onChange={e => changeInput(4, e)}
            onBlur={e => validationCheck(4, e)}
          />
        </div>
        <div className="errMsg">
          <p>{valCheckMsg[4]}</p>
        </div>
      </div>
      <div className="form__message">
        <label>Сообщение</label>
        <textarea
          id="content"
          className="inputs__message"
          onChange={e => changeInput(5, e)}
          onBlur={e => validationCheck(5, e)}
        />
        <div className="errMsg">
          <p>{valCheckMsg[5]}</p>
        </div>
      </div>
      <div className="form__files">
        {attaches.map(attach => (
          <div className="form__files__item" key={attach.name}>
            <img src={clipbig} alt="clip" className="form__files__item__img" />
            <div className="form__files__item__name">{attach.name}</div>
            <div
              className="form__files__item__delete"
              onClick={() => fileDelete(attach.name)}
            >
              <img src={trash} alt="trash" />
              <p>Удалить</p>
            </div>
          </div>
        ))}
      </div>
      <div className="form__attachment">
        <label className="form__attachment__file">
          <img src={clip} alt="clip" />
          <input
            type="file"
            accept="image/*,.doc,.docx,.xls,.xlsx,application/pdf,application/zip,.txt,.rtf"
            onChange={fileUploadClick}
          />
          Прикрепить файл
        </label>
      </div>
      <Button
        disabled={checkAll === false}
        className={checkAll === true ? "button-active" : "button-disable"}
        onClick={send}
      >
        Отправить
      </Button>
    </div>
  );
};

export default Form;
