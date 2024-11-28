import { body, validationResult } from "express-validator";
import { USER_MESSAGES } from "../constants/mesages";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { userService } from "../controllers/user.controllers";

// export const valiLogin = [
//   body("email")
//     .isEmail()
//     .withMessage(USER_MESSAGES.INVALID_EMAIL)
//     .custom(async (value, { req }) => {
//       // Ensure that the email exists
//       const user = await prisma.user.findUnique({
//         where: { email: value },
//       });
//       if (!user) {
//         return Promise.reject(USER_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
//       }
//       const isBan = user.status_id === 3;
//       if (isBan) {
//         return Promise.reject(USER_MESSAGES.BANNED_USER);
//       }

//       req.user = user;
//       return true;
//     }),

//   body("password")
//     .isLength({ min: 6 })
//     .withMessage(USER_MESSAGES.PASSWORD_LENGTH)
//     .custom(async (value, { req }) => {
//       // Ensure that the email exists
//       const user = req.user;
//       const isPasswordMatch = await bcrypt.compare(value, user.password);
//       if (!isPasswordMatch) {
//         return Promise.reject(USER_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
//       }
//       return true;
//     }),
// ];

export const valiRegister = [
  body("full_name").notEmpty().withMessage(USER_MESSAGES.FULL_NAME_REQUIRED),
  body("email")
    .isEmail()
    .withMessage(USER_MESSAGES.INVALID_EMAIL)
    .custom(async (value) => {
      // Ensure that the email does not exist

      const user = await userService.findUser(value);

      if (user) {
        return Promise.reject(USER_MESSAGES.INVALID_EMAIL);
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage(USER_MESSAGES.PASSWORD_LENGTH),
];
