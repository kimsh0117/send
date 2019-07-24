import React from "react";
import { clip, clipbig, trash } from "assets/img";
import { Button } from "components/common";
import { DragAndDrop } from "components";

import "./Form.scss";

const Form = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  handleDrop,
  fileUploadClick,
  fileDelete,
  attaches,
}) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <DragAndDrop handleDrop={handleDrop}>
        <div className="form__title">Отправлялка сообщений</div>
        <div className="form__from">
          <label>От кого</label>
          <div className="inputs">
            <input
              type="text"
              id="namefrom"
              placeholder="Имя"
              className="inputs__name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.namefrom}
            />
            <input
              type="email"
              id="emailfrom"
              placeholder="Email"
              className="inputs__email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emailfrom}
            />
            {}
            <div className="errMsg">
              {errors.namefrom && touched.namefrom && <p>{errors.namefrom}</p>}
              {errors.emailfrom && touched.emailfrom && <p>{errors.emailfrom}</p>}
            </div>
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.namefor}
            />
            <input
              type="email"
              id="emailfor"
              placeholder="Email"
              className="inputs__email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emailfor}
            />
            <div className="errMsg">
              {errors.namefor && touched.namefor && <p>{errors.namefor}</p>}
              {errors.emailfor && touched.emailfor && <p>{errors.emailfor}</p>}
            </div>
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.theme}
            />
            <div className="errMsg">
              {errors.theme && touched.theme && <p>{errors.theme}</p>}
            </div>
          </div>
        </div>
        <div className="form__message">
          <label>Сообщение</label>
          <textarea
            id="content"
            className="inputs__message"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
          />
          <div className="errMsg">
            {errors.content && touched.content && <p>{errors.content}</p>}
          </div>
        </div>
        <div className="form__files">
          {attaches.map(attach => (
            <div className="form__files__item" key={attach.name}>
              <img
                src={clipbig}
                alt="clip"
                className="form__files__item__img"
              />
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
          type="submit"
          disabled={isSubmitting}
          className={
            isSubmitting ? "form__sendbutton" : "form__sendbutton--disable"
          }
        >
          Отправить
        </Button>
      </DragAndDrop>
    </form>
  );
};

export default Form;
