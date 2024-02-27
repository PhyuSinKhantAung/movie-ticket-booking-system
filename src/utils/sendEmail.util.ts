import dotenv from "dotenv";
dotenv.config();
import * as FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData.default);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY ? String(process.env.MAILGUN_API_KEY) : "",
});

type mailData = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export function getMessage(body: string, subject: string): mailData {
  return {
    from: "Mailgun Sandbox <postmaster@sandbox03df332c2ec84aa89f235f46dd1b55b4.mailgun.org>",
    to: "example@gmail.com",
    subject,
    html: `<strong>${body}</strong>`,
  };
}

export async function sendEmail(data: mailData) {
  //   mg.messages
  //     .create(
  //   process.env.MAILGUN_DOMAIN ? String(process.env.MAILGUN_DOMAIN) : "",
  //   data,
  //     )
  //     .then((msg) => {
  //       console.log("hey it runn");
  //       console.log(msg);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  await mg.messages.create(
    process.env.MAILGUN_DOMAIN ? String(process.env.MAILGUN_DOMAIN) : "",
    data,
  );
}
