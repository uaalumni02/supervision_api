import gmail from "node-gmailer";

const recipient = process.env.GMAIL_ADDRESS;
const sendHandler = (reset_token) => {
  console.log(reset_token);
  gmail
    .send(recipient, {
      subject: "Password Reset",
      text:
        "Click on link to reset password: " +
        "https://www.supervision.com/reset/" +
        reset_token,
    })
    .then((response) => {})
    .catch((error) => {});
};

export default sendHandler;
