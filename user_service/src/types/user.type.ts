import { Users } from "../models/user.model";

import { Request } from "express";

// Định nghĩa lại kiểu của `req.user`
export interface CustomRequest extends Request {
  user?: any; // Hoặc định nghĩa kiểu chính xác của `user` nếu bạn biết nó.
  cookies: any;
}

