import { Request, Response, Router } from "express";
import { pool } from "../../db";

export const router = Router();

// GET /midTermAPI/v1/categories
router.get("/", async (req: Request, res: Response) => {
  const data = await pool.query(`SELECT * FROM categories;`);
  res.json(data.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM categories WHERE id = $1;`, [
    id,
  ]);

  const category = data.rows[0];

  if (!category) {
    return res
      .status(404)
      .json({ error: 404, message: `Category with id ${id} not found` });
  }
  res.json(category);
});

// POST /midTermAPI/v1/categories
router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;

  const data = await pool.query(
    `INSERT INTO categories (name) VALUES ($1) RETURNING *;`,
    [name]
  );

  res.status(201).json(data.rows[0]);
});

// PUT /midTermAPI/v1/categories/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM categories WHERE id = $1;`, [
    id,
  ]);
  const category = data.rows[0];

  if (!category) {
    return res
      .status(404)
      .json({ error: 404, message: `Category with id ${id} not found` });
  }

  const { name } = req.body;

  const updateCategory = await pool.query(
    `
      UPDATE categories 
      SET name = $1
      WHERE id = $2 
      RETURNING *
    `,
    [name, id]
  );
  res.json(updateCategory.rows[0]);
});

// DELETE /midTermAPI/v1/categories/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM categories WHERE id = $1;`, [
    id,
  ]);
  const category = data.rows[0];

  if (!category) {
    return res
      .status(404)
      .json({ error: 404, message: `Category with id ${id} not found` });
  }

  const deleteCategory = await pool.query(
    `DELETE FROM categories WHERE id = $1 RETURNING *;`,
    [id]
  );

  res.json(deleteCategory.rows[0]);
});
