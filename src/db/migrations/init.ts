import { client } from "..";

const run = async () => {
  try {
    await client.connect();

    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS categories;

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            price MONEY NOT NULL,
            description TEXT NOT NULL,
            category_id INT REFERENCES categories(id),
            image_url VARCHAR(255) NOT NULL,
        );

        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            product_id INT REFERENCES products(id),
            quantity INT NOT NULL,
            total MONEY NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            user_id INT REFERENCES users(id)
        );

        CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            product_id INT REFERENCES products(id)
        );
    `);
    console.log(`Tables created successfully!`);

    const data = await client.query(`SELECT * FROM users;`);

    console.log(`Current data in users table is ${JSON.stringify(data.rows)}`);
  } catch (err) {
    console.error(`Error occurred while creating tables: ${err}`);
  }
};

run().then(() => client.end());
