import sendsay from "./client";

export const sendEmail = (letter, mca) =>
  sendsay
    .request({
      action: "issue.send.test",
      letter,
      sendwhen: "test",
      mca
    })
    .then(res => res);

export const checkStatus = trackid =>
  sendsay
    .request({
      action: "track.get",
      id: trackid,
      session: sendsay.session
    })
    .then(res => res);
