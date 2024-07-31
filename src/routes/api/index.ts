import { Router } from "express";
import { router as categoriesRouter } from "./categories.router";
import { router as ordersRouter } from "./orders.router";
import { router as productsRouter } from "./products.router";
import { router as usersRouter } from "./users.router";

export const mainRouter = Router();

const ROUTER = [
  { url: "/users", router: usersRouter },
  { url: "/products", router: productsRouter },
  { url: "/orders", router: ordersRouter },
  { url: "/categories", router: categoriesRouter },
];

ROUTER.forEach(({ url, router }) => {
  mainRouter.use(url, router);
});
