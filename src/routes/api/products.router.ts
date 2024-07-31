import { Request, Response, Router } from "express";
import { pool } from "../../db";

export const router = Router();

// GET /midTermAPI/v1/products
router.get("/", async (req: Request, res: Response) => {
  const data = await pool.query(`SELECT * FROM products;`);
  res.json(data.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM products WHERE id = $1;`, [id]);

  const product = data.rows[0];
  if (!product) {
    return res.status(404).json({ message: `Product with id ${id} not found` });
  }
  res.json(product);
});

// POST /midTermAPI/v1/products
router.post("/", async (req: Request, res: Response) => {
  const { title, price, description, image_url } = req.body;

  const data = await pool.query(
    `INSERT INTO products (title, price, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [title, price, description, image_url]
  );

  res.status(201).json(data.rows[0]);
});

// PUT /midTermAPI/v1/products/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM products WHERE id = $1;`, [id]);
  const product = data.rows[0];

  if (!product) {
    return res.status(404).json({ message: `Product with id ${id} not found` });
  }

  const { title, price, description, image_url } = req.body;

  const updateProduct = await pool.query(
    `
      UPDATE products 
      SET title = $1, price = $2, description = $3, image_url = $4
      WHERE id = $5 
      RETURNING *
    `,
    [title, price, description, image_url, id]
  );
  res.json(updateProduct.rows[0]);
});

// DELETE /midTermAPI/v1/products/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM products WHERE id = $1;`, [id]);
  const product = data.rows[0];

  if (!product) {
    return res
      .status(404)
      .json({ error: 404, message: `Product with id ${id} not found` });
  }

  const deleteProduct = await pool.query(
    `DELETE FROM products WHERE id = $1 RETURNING *;`,
    [id]
  );
  res.json(deleteProduct.rows[0]);
});
