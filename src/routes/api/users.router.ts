import { Request, Response, Router } from "express";
import { pool } from "../../db";

export const router = Router();

// GET /midTermAPI/v1/users
router.use("/", async (req: Request, res: Response) => {
  const data = await pool.query(`SELECT * FROM users;`);
  res.send(data.rows);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM users WHERE id = $1;`, [id]);

  const user = data.rows[0];
  if (!user) {
    return res.status(404).json({ message: `User with id ${id} not found` });
  }
  res.send(user);
});

// POST /midTermAPI/v1/users
router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await pool.query(
    `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;`,
    [email, password]
  );

  res.send(data.rows[0]);
});

// PUT /midTermAPI/v1/users/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM users WHERE id = $1;`, [id]);
  const user = data.rows[0];

  if (!user) {
    return res.status(404).json({ message: `User with id ${id} not found` });
  }

  const { email, password } = req.body;

  const updateUser = await pool.query(
    `
      UPDATE users 
      SET email = $1, password = $2 
      WHERE id = $3 
      RETURNING *
    `,
    [email, password, id]
  );
  res.send(updateUser.rows[0]);
});

// DELETE /midTermAPI/v1/users/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await pool.query(`SELECT * FROM users WHERE id = $1;`, [id]);
  const user = data.rows[0];

  if (!user) {
    return res.status(404).json({ message: `User with id ${id} not found` });
  }

  const deleteUser = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );
  res.send(deleteUser.rows[0]);
});
