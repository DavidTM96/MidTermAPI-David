import { Request, Response, Router } from "express";
import { pool } from "../../db";

export const router = Router();

// GET /midTermAPI/v1/orders
router.get("/", async (req: Request, res: Response) => {
  const data = await pool.query(`SELECT * FROM orders;`);

  res.json(data.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query(`SELECT * FROM orders WHERE id = $1;`, [id]);

  const order = data.rows[0];

  if (!order) {
    return res
      .status(404)
      .json({ error: 404, message: `Order with id ${id} not found` });
  }

  res.json(order);
});

// POST /midTermAPI/v1/orders
router.post("/", async (req: Request, res: Response) => {
  const { product_id, quantity, user_id } = req.body;

  const data = await pool.query(
    `INSERT INTO orders (product_id, quantity, user_id) VALUES ($1, $2, $3) RETURNING *;`,
    [product_id, quantity, user_id]
  );

  res.status(201).json(data.rows[0]);
});

// PUT /midTermAPI/v1/orders/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query(`SELECT * FROM orders WHERE id = $1;`, [id]);

  const order = data.rows[0];

  if (!order) {
    return res
      .status(404)
      .json({ error: 404, message: `Order with id ${id} not found` });
  }

  const { product_id, quantity, user_id } = req.body;

  const updateOrder = await pool.query(
    `
      UPDATE orders 
      SET product_id = $1, quantity = $2, user_id = $3
      WHERE id = $4 
      RETURNING *
    `,
    [product_id, quantity, user_id, id]
  );

  res.json(updateOrder.rows[0]);
});

// DELETE /midTermAPI/v1/orders/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pool.query(`SELECT * FROM orders WHERE id = $1;`, [id]);

  const order = data.rows[0];

  if (!order) {
    return res
      .status(404)
      .json({ error: 404, message: `Order with id ${id} not found` });
  }

  const deleteOrder = await pool.query(
    `DELETE FROM orders WHERE id = $1 RETURNING *;`,
    [id]
  );
  res.json(deleteOrder.rows[0]);
});
