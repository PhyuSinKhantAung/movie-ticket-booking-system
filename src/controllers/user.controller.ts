import { NextFunction, Request, Response } from "express";
import UserService from "src/services/user.service";
import {
  ForgotPasswordBody,
  Token,
  ResetPasswordBody,
  SignInUserBody,
  SignUpUserBody,
} from "src/validations/user.schema";
import AuthController from "./auth.controller";
import { getMessage, sendEmail } from "src/utils/sendEmail.util";
import { InternalServerException } from "src/utils/http-exceptions.util";
import crypto from "crypto";

export default class UserController {
  controller = new AuthController();
  service = new UserService();
  async signup(
    req: Request<unknown, unknown, SignUpUserBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await this.service.create(req.body);

      const payload = {
        id: user._id.toString(),
        email: user.email,
        type: "user",
        role: "user",
      };

      const accessToken = await this.controller.generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET
          ? String(process.env.ACCESS_TOKEN_SECRET)
          : "",
        "1hr",
      );

      const refreshToken = await this.controller.generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET
          ? String(process.env.REFRESH_TOKEN_SECRET)
          : "",
        "30d",
      );

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(
    req: Request<unknown, unknown, SignInUserBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await this.service.getUserByEmail(req.body.email, true);

      await this.controller.verifyPassword(req.body.password, user.password);

      const payload = {
        id: user._id.toString(),
        email: user.email,
        type: "user",
        role: "user",
      };

      const accessToken = await this.controller.generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET
          ? String(process.env.ACCESS_TOKEN_SECRET)
          : "",
        "1hr",
      );

      const refreshToken = await this.controller.generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET
          ? String(process.env.REFRESH_TOKEN_SECRET)
          : "",
        "30d",
      );

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(
    req: Request<unknown, unknown, ForgotPasswordBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    const user = await this.service.getUserByEmail(req.body.email);
    try {
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      const resetURL = `${req.protocol}://${req.get(
        "host",
      )}/api/users/resetPassword/${resetToken}`;

      const bodyMessage = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
      const subject =
        "Your password reset token, it is only valid for 10 mins.";

      const data = getMessage(bodyMessage, subject);

      await sendEmail(data);

      res.json({
        message: "Password reset token has been sent to email",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save({ validateBeforeSave: false });
      next(new InternalServerException("Sending mail failed"));
    }
  }

  async resetPassword(
    req: Request<Token, unknown, ResetPasswordBody, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await this.service.getUserByPasswordResetToken(hashedToken);
      user.password = req.body.newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      const payload = {
        id: user._id.toString(),
        email: user.email,
        type: "user",
        role: "",
      };

      const accessToken = await this.controller.generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET
          ? String(process.env.ACCESS_TOKEN_SECRET)
          : "",
        "1hr",
      );

      const refreshToken = await this.controller.generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET
          ? String(process.env.REFRESH_TOKEN_SECRET)
          : "",
        "30d",
      );

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    req: Request<unknown, unknown, Token, unknown>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken =
        await this.controller.generateAccessTokenWithRefreshToken(
          req.body.token,
        );
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}
