import { Router } from "express";
import { router as productsRouter } from "./products.router";
import { router as usersRouter } from "./users.router";

export const mainRouter = Router();

const ROUTER = [
  { url: "/users", router: usersRouter },
  { url: "/products", router: productsRouter },
];

ROUTER.forEach(({ url, router }) => {
  mainRouter.use(url, router);
});
