import { Router } from "express";
const router = Router();
import nodemailer from "nodemailer";
import { v4 as uuid4 } from "uuid";

router.route("/").post((req, res) => {
  const { email } = req.body;

  const idemPotencyKey = uuid4();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "nodemailer email receive",
      html: `<h>{idemPotencyKey}</h>`,
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (err) {
        console.log("error", error);
      } else {
        console.log("sent email", info.response);
        res.json({ status: 200, info });
      }
    });
  } catch (error) {
    console.log("error", error);
    res.json({ status: 401, error });
  }
});

export default router;
