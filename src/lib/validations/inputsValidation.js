import * as Yup from "yup";

const cantBeEmpty = "Не может быть пустым";
const cantBeShort = "Не менее 2 символов";
const cantBeBig = "Слишком длинный текст";
const invalidEmail = "Неправильный формат почты";

const validationSchema = Yup.object({
  namefrom: Yup.string()
    .min(2, cantBeShort)
    .max(50, cantBeBig)
    .required(cantBeEmpty),
  emailfrom: Yup.string()
    .email(invalidEmail)
    .required(cantBeEmpty),
  namefor: Yup.string()
    .min(2, cantBeShort)
    .max(50, cantBeBig)
    .required(cantBeEmpty),
  emailfor: Yup.string()
    .email(invalidEmail)
    .required(cantBeEmpty),
  theme: Yup.string()
    .min(2, cantBeShort)
    .max(100, cantBeBig)
    .required(cantBeEmpty),
  content: Yup.string()
    .min(2, cantBeShort)
    .required(cantBeEmpty)
});

export { validationSchema };
