import { Router } from "express";
import { router as usersRouter } from "./users.router";

export const mainRouter = Router();

const ROUTER = [{ url: "/users", router: usersRouter }];

ROUTER.forEach(({ url, router }) => {
  mainRouter.use(url, router);
});
