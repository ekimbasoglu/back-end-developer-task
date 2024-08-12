import { Request, Response } from "express";

const login = (req: Request, res: Response): void => {
  res.json({ message: "Login successful!" });
};

const signup = (req: Request, res: Response): void => {
  res.json({ message: "Signup successful!" });
};

export default { login, signup };
