import { Router, Request, Response } from "express";

import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", async (req, res, next) => {
  const controller = new AuthController();

  try {
    const response = await controller.register(req.body);
    return res.json(response);
  } catch (err) {
    console.log('errr', err);
    next(err);
  }
});

router.post("/verifyOtp", async (req: Request, res: Response, next: Function) => {
  const controller = new AuthController();

  try {
    const response = await controller.verifyOtp(req.body);
    return res.json(response);
  } catch (err) {
    console.log('errr', err); 
    next(err);
  }
});


router.post("/login", async (req: Request, res: Response, next: Function) => {
  const controller = new AuthController();
  
  try {
    const response = await controller.login(req.body);
    return res.json(response);
  } catch (err) {
    console.log('errr', err);
    next(err);
  }
});

export default router;
