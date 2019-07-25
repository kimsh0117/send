import React from "react";
import { clip, clipbig, trash } from "assets/img";
import { Button } from "components/common";
import { DragAndDrop } from "components";
import formStyles from "./Form.module.scss";

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
  attaches
}) => {
  return (
    <form className={formStyles["form"]} onSubmit={handleSubmit}>
      <DragAndDrop handleDrop={handleDrop}>
        <div className={formStyles["form__title"]}>Отправлялка сообщений</div>
        <div className={formStyles["form__from"]}>
          <label className={formStyles["form__from__label"]}>От кого</label>
          <div className={formStyles["form__from__input"]}>
            <input
              type="text"
              name="namefrom"
              placeholder="Имя"
              className={formStyles["form__from__input__name"]}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.namefrom}
            />
            <input
              type="email"
              name="emailfrom"
              placeholder="Email"
              className={formStyles["form__from__input__email"]}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emailfrom}
            />
            <div className={formStyles["form__from__input__error-message"]}>
              {errors.namefrom && touched.namefrom ? (
                <p>{errors.namefrom}</p>
              ) : (
                <p />
              )}
              {errors.emailfrom && touched.emailfrom ? (
                <p>{errors.emailfrom}</p>
              ) : (
                <p />
              )}
            </div>
          </div>
        </div>
        <div className={formStyles["form__for"]}>
          <label className={formStyles["form__for__label"]}>Кому</label>
          <div className={formStyles["form__for__input"]}>
            <input
              type="text"
              name="namefor"
              placeholder="Имя"
              className={formStyles["form__for__input__name"]}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.namefor}
            />
            <input
              type="email"
              name="emailfor"
              placeholder="Email"
              className={formStyles["form__for__input__email"]}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emailfor}
            />
            <div className={formStyles["form__for__input__error-message"]}>
              {errors.namefor && touched.namefor ? (
                <p>{errors.namefor}</p>
              ) : (
                <p />
              )}
              {errors.emailfor && touched.emailfor ? (
                <p>{errors.emailfor}</p>
              ) : (
                <p />
              )}
            </div>
          </div>
        </div>
        <div className={formStyles["form__theme"]}>
          <label className={formStyles["form__theme__label"]}>
            Тема письма
          </label>
          <div className={formStyles["form__theme__input"]}>
            <input
              type="text"
              name="theme"
              placeholder="Тема письма"
              className={formStyles["form__theme__input__theme"]}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.theme}
            />
            <div className={formStyles["form__theme__input__error-message"]}>
              {errors.theme && touched.theme ? <p>{errors.theme}</p> : <p />}
            </div>
          </div>
        </div>
        <div className={formStyles["form__message"]}>
          <label className={formStyles["form__message__label"]}>
            Сообщение
          </label>
          <textarea
            name="content"
            className={formStyles["form__message__message"]}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
          />
          <div className={formStyles["form__message__error-message"]}>
            {errors.content && touched.content ? (
              <p>{errors.content}</p>
            ) : (
              <p />
            )}
          </div>
        </div>
        <div className={formStyles["form__files"]}>
          {attaches.map(attach => (
            <div className={formStyles["form__files__item"]} key={attach.name}>
              <img
                src={clipbig}
                alt="clip"
                className={formStyles["form__files__item__img"]}
              />
              <div className={formStyles["form__files__item__name"]}>
                {attach.name}
              </div>
              <div
                className={formStyles["form__files__item__delete"]}
                onClick={() => fileDelete(attach.name)}
              >
                <img
                  src={trash}
                  alt="trash"
                  className={formStyles["form__files__item__delete__image"]}
                />
                <p>Удалить</p>
              </div>
            </div>
          ))}
        </div>
        <div className={formStyles["form__attachment"]}>
          <label className={formStyles["form__attachment__label"]}>
            <img
              src={clip}
              alt="clip"
              className={formStyles["form__attachment__label__image"]}
            />
            <input
              type="file"
              accept="image/*,.doc,.docx,.xls,.xlsx,application/pdf,application/zip,.txt,.rtf"
              onChange={fileUploadClick}
              className={formStyles["form__attachment__label__input"]}
            />
            Прикрепить файл
          </label>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={formStyles["form__send-button"]}
        >
         {isSubmitting ? 'Отправляет' : 'Отправить'}
        </Button>
      </DragAndDrop>
    </form>
  );
};

export default Form;
