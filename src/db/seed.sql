INSERT INTO users (email, password) 
VALUES ('test123@gmail.com', 'password123'),
       ('random@gmail.com', 'admin123'),
       ('user123@gmail.com', 'user123');

INSERT INTO products (title, price, description, image)
VALUES ('Nike Air Max', 100, 'The Nike Air Max is a classic sneaker that has been around for years. It features a visible air unit in the heel and a sleek design that is perfect for everyday wear.', 'https://images.unsplash.com/photo-1606780290001-4b3b3e3b3b3b'),
       ('Adidas Superstar', 80, 'The Adidas Superstar is a classic sneaker that has been around for years. It features a rubber shell toe and a sleek design that is perfect for everyday wear.', 'https://images.unsplash.com/photo-1606780290001-4b3b3e3b3b3b');

INSERT INTO orders (user_id)
VALUES (1),
       (2),
       (3);

INSERT INTO categories (name)
VALUES ('Sneakers');

INSERT INTO product_categories (product_id, category_id)
VALUES (1, 1);