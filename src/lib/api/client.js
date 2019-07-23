import Sendsay from "sendsay-api/dist/sendsay-api.cjs";

let sendsay = new Sendsay();

sendsay.login({
  login: process.env.REACT_APP_SENDSAY_ID,
  sublogin: "",
  password: process.env.REACT_APP_SENDSAY_PASSWORD
});

export default sendsay;