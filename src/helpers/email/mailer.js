import gmail from "node-gmailer";

const recipient = process.env.GMAIL_ADDRESS;
const sendHandler = (reset_token) => {
  gmail
    .send(recipient, {
      subject: "Password Reset",
      text:
        "Click on link to reset password: " +
        "https://uaalumni02.github.io/supervision-app/#/reset/" +
        reset_token,
    })
    .then((response) => {})
    .catch((error) => {});
};

export default sendHandler;
