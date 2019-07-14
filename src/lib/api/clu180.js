import Sendsay from "sendsay-api";

const sendsay = new Sendsay({ apiUrl: "https://api.sendsay.ru/clu180" });

sendsay.login({
  login: 'creaid1703@gmail.com',
  password: 'chaoo3Y'
})

export const IssueSendTest = (letter, email) =>
  sendsay.request({
    action: "issue.send.test",
    letter,
    sendwhen: "test",
    mca: email
  });
