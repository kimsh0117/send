import sendsay from "./client";

export const sendEmail = (letter, mca) =>
  sendsay
    .request({
      action: "issue.send.test",
      letter,
      sendwhen: "test",
      mca
    })
    .then(res => res)
    .catch(err => err);
