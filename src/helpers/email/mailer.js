import gmail from "node-gmailer";

const recipient = process.env.GMAIL_ADDRESS;
const sendHandler = (reset_token) => {
  gmail
    .send(recipient, {
      subject: "Password Reset",
      text:
        "Click on link to reset password: " +
        "http://localhost:3001/reset/" +
        reset_token,
    })
    .then((response) => {})
    .catch((error) => {});
};

export default sendHandler;
