import * as Yup from "yup";

const cantBeEmpty = "Не может быть пустым";
const cantBeShort = "Не менее 2 символов";
const cantBeBig = "Слишком длинный текст";
const invalidEmail = "Неправильный формат почты";

const initialState = {
  namefrom: "",
  emailfrom: "",
  namefor: "",
  emailfor: "",
  theme: "",
  content: ""
};

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

// let validationCheck = (num, e) => {
//   const checkMsg = [
//     ...this.state.valCheckMsg.slice(0, num),
//     "",
//     ...this.state.valCheckMsg.slice(num + 1)
//   ],
//     emailCheck = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/,
//     nameCheck = /^[a-zA-Zа-яА-Я]*$/,
//     value = e.target.value.replace(/\s/gi, "");

//   switch (num) {
//     case 0:
//       if (value === "") {
//         checkMsg[num] = "Имя не может быть пустым";
//       } else if (!nameCheck.test(value)) {
//         checkMsg[num] = "Please enter correct name format";
//       }
//       break;
//     case 1:
//       if (value === "") {
//         checkMsg[num] = "Email не может быть пустым";
//       } else if (!emailCheck.test(value)) {
//         checkMsg[num] = "Please enter correct email format";
//       }
//       break;
//     case 2:
//       if (value === "") {
//         checkMsg[num] = "Имя не может быть пустым";
//       } else if (!nameCheck.test(value)) {
//         checkMsg[num] = "Please enter correct name format";
//       }
//       break;
//     case 3:
//       if (value === "") {
//         checkMsg[num] = "Email не может быть пустым";
//       } else if (!emailCheck.test(value)) {
//         checkMsg[num] = "Please enter correct email format";
//       }
//       break;
//     case 4:
//       if (value === "") {
//         checkMsg[num] = "Тема письма не может быть пустым";
//       } else if (false) {
//         checkMsg[num] = "Please enter correct theme format";
//       }
//       break;
//     case 5:
//       if (value === "") {
//         checkMsg[num] = "Сообщение не может быть пустым";
//       } else if (false) {
//         checkMsg[num] = "Please enter correct contens format";
//       }
//       break;
//     default:
//       break;
//   }
// };
export { validationSchema, initialState };
